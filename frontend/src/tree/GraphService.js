/**
 * Created by user on 20.04.17.
 */
import  vis from 'vis';
import '../lib/RestService';


class GraphService{
    constructor(RestService,q) {
        this.inited = false;
        this.RestService = RestService;
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

    getNetwork() {
        const container= document.getElementById('mynetwork');
        let data = {
            nodes: this.nodes,
            edges: this.links
        };
        const options = {
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
        console.log(toAdd);
        return this.RestService.post('nodes',{
            "category":toAdd.group,
            "text":toAdd.text,
            "dialogue_id":this.dialogueId,
            "type":toAdd.type
        }).then((node)=>{
            node.label = node.text;
            node.group = node.category;
            this.nodes.add(node);

            return this.RestService.post('links',{'from_node_id':toAdd.fromNodeId,'to_node_id':node.id,"dialogue_id":this.dialogueId}).then((link)=>{
                link.from = link.from_node_id;
                link.to = link.to_node_id;
                link.color = {inherit:'to'};
                this.links.add(link)
            });
        })
    }

    deleteNode(id) {
        return this.RestService.remove('nodes',id).then((node)=>{
            this.nodes.remove(id);
        });
    }

    updateNode(node){
        node.text = node.label;
        return this.RestService.put('nodes',{},node).then((res)=> {
                this.nodes.update(res);
                return res;
        });
        
    }

    addLink(option){
        return this.RestService.post('links',{'from_node_id':option.from,'to_node_id':option.to,"dialogue_id":this.dialogueId}).then((link)=>{
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
        return this.RestService.remove('links',toDelete[0].id).then((link)=>{
            this.links.remove(toDelete[0].id);
        });
    }

// private

    fetchNodes(dialogueId){
        const where  = !!dialogueId ? {filter:{where:{dialogue_id:dialogueId }}} : undefined ;
        if(where != void 0) return this.RestService.list('nodes',where).then((res)=>res);
        return Promise.resolve([]);
    }

    fetchLinks(dialogueId){
        const  where  = !!dialogueId ? {filter:{where:{dialogue_id: dialogueId}}} : undefined;
        if (where != void 0) return this.RestService.list('links',where).then((res)=>res);
        return Promise.resolve([]);
    }

    setLinks(links){
        this.links.clear();
        this.links.add(links);
    }

    setNodes(nodes){
        this.nodes.clear();
        this.nodes.add(nodes);
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



};

GraphService.$inject = ['RestService', '$q'];

angular.module('app').service('GraphService', GraphService);




