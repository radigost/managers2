/**
 * Created by user on 20.04.17.
 */
let vis = require('vis');



class GraphService{
    constructor(Restangular,q) {
        this.inited = false;
        this.Restangular = Restangular;
        this.q = q;

        this.nodes = new vis.DataSet();
        this.links = new vis.DataSet();
        this.network = null;
        
    }

    init(dialogueId) {
        this.dialogueId = dialogueId;
        this.inited = false;
        let deferred = this.q.defer();

        this.fetchNodes(dialogueId).then((res)=>{
            _.forEach(res,(node)=>{
                node.label = this.formatText(node.text);
                node.group = node.category;
                switch (node.type){
                    case 'success':
                        node.color = {border:'green'}
                    case 'failure':
                        node.color = {border:'red'}
                    default:
                }
            });
            this.setNodes(res);                


            this.fetchLinks(dialogueId).then((res)=>{
                _.forEach(res,(link)=>{
                    link.from = link.from_node_id;
                    link.to = link.to_node_id;
                    link.color = {inherit:'to'};
                });
                this.setLinks(res);

                this.inited = true;
                deferred.resolve();
            });

        });


        
        
        return deferred.promise;
    }
    
    fetchNodes(dialogueId){
        let deferred = this.q.defer();
        let  where  = !!dialogueId ? '/?filter[where][dialogue_id]=' + dialogueId : null;
        fetch('/api/v1/nodes'+where)
            .then(res => res.json())
            .then((res)=> deferred.resolve(res));
        return deferred.promise;
    }

    setNodes(nodes){
        this.nodes.clear();
        this.nodes.add(nodes);
    }

    fetchLinks(dialogueId){
        let deferred = this.q.defer();
        let  where  = !!dialogueId ? '/?filter[where][dialogue_id]=' + dialogueId : null;
        fetch('/api/v1/links'+where)
            .then(res => res.json())
            .then((res)=> deferred.resolve(res));
        return deferred.promise;
        
    }

    setLinks(links){
        this.links.clear();
        this.links.add(links);
    }
    
    formatText(text) {
        let outText = "";
        if (!text){
            return ''
        }
        else {
            const textArray = text.split(' ');
            textArray.forEach(function (element,index) {
                index %3 ==0 ? outText+=" " + element+ "\n "  : outText+= " " + element +  " ";
            });
        }
        return outText;
    }


    getNetwork() {
        const container= document.getElementById('mynetwork');
        let data = {
            nodes: this.nodes,
            edges: this.links
        };
        let options = {
            layout: {},
            edges:{
                physics:false,
                length:300,
                smooth:false,
                arrows:{
                    to: true
                }
            },
            nodes:{
                shape:'box'
            },
            "physics": {
                "solver": "repulsion"
            }
        };
        this.network = new vis.Network(container, data,options);

        return this.network;
    }
    addNode(toAdd) {
        return this.Restangular.one('api/v1/').post('nodes',{"category":toAdd.group,"text":toAdd.text,"dialogue_id":this.dialogueId,"type":toAdd.type}).then((node)=>{
            node.label = node.text;
            node.group = node.category;
            this.nodes.add(node);

            return this.Restangular.one('api/v1').post('links',{'from_node_id':toAdd.fromNodeId,'to_node_id':node.id,"dialogue_id":this.dialogueId}).then((link)=>{
                link.from = link.from_node_id;
                link.to = link.to_node_id;
                link.color = {inherit:'to'};
                this.links.add(link)
            });
        })
    }

    addLink(option){
        return this.Restangular.one('api/v1').post('links',{'from_node_id':option.from,'to_node_id':option.to,"dialogue_id":this.dialogueId}).then((link)=>{
                link.from = link.from_node_id;
                link.to = link.to_node_id;
                link.color = {inherit:'to'};
                this.links.add(link)
            });
    }
    deleteLink(option){
        let toDelete = this.links.get({
            filter: (link) => link.from == option.from && link.to == option.to
        });

        return this.Restangular.one('api/v1/links',toDelete[0].id).remove().then((link)=>{
            this.links.remove(toDelete[0].id);
        });
    }

    deleteNode(id) {
        this.Restangular.one('api/v1/nodes',id).remove().then((node)=>{
            this.nodes.remove(id);
        });
    }

    setRouter(router){
        this.router = router;
    }
};

GraphService.$inject = ['Restangular', '$q'];

angular.module('app').service('GraphService', GraphService);




