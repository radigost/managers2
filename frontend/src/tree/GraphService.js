/**
 * Created by user on 20.04.17.
 */
var vis = require('vis');

angular.module('app').service('GraphService', GraphService);

GraphService.$inject = ['Restangular', '$q'];

function GraphService(Restangular,q) {
    var inited = false;
    // console.log(vis);
    var nodes = new vis.DataSet();
    var links = new vis.DataSet();
    var network;
    var _this = this;



    var graphService = {
        init:init,
        getNetwork:getNetwork,
        addNode:addNode,
        deleteNode:deleteNode
    };
    Object.defineProperty(graphService,'nodes',{get:function () {
        return nodes;
    }});
    Object.defineProperty(graphService,'network',{get:function () {
        return network;
    }});
    Object.defineProperty(graphService,'links',{get:function () {
        return links;
    }});



    return graphService;

    function init() {
        var deferred = q.defer();
        Restangular.all('api/v1/nodes/').getList().then((res)=>{
            _.forEach(res,(node)=>{
                // node.color = node.category == 'npc'? '#d9534f':'#1b6d85';
                node.label = formatText(node.text);
                node.group = node.category;
            });
            nodes.add(res);
        });
        Restangular.all('api/v1/links').getList().then((res)=>{
            _.forEach(res,(link)=>{
                link.from = link.from_node_id;
                link.to = link.to_node_id;
                link.color = {inherit:'to'};
            });
            links.add(res);
        })
        inited = true;
        deferred.resolve();
        return deferred.promise;
    }
    function formatText(text) {
        var outText = "";
        if (!text){
            return ''
        }
        else {
            var textArray = text.split(' ');
            textArray.forEach(function (element,index) {
                index %3 ==0 ? outText+=" " + element+ "\n "  : outText+= " " + element +  " ";

            });
        }
        return outText;

    }
    function getNetwork() {
        var container= document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: links
        };
        var options = {
            layout: {
                // hierarchical: {
                //     direction: 'LR',
                // // sortMethod:'hubsize',
                //     levelSeparation:215,
                //     nodeSpacing:85,
                //     edgeMinimization:true,
                //     blockShifting:true
                // }
            },
            edges:{
                length:300,
                // "smooth": {
                //     "type": "cubicBezier",
                //     "forceDirection": "vertical",
                //     "roundness": 0.6
                // },
                arrows:{
                    to: true
                }
            },
            nodes:{
                shape:'box'
            },
            // "physics": {
            //     "hierarchicalRepulsion": {
            //         "centralGravity": 1,
            //         "nodeDistance": 145
            //     },
            //     "minVelocity": 0.75,
            //     "solver": "repulsion"
            // }
        };
        network = new vis.Network(container, data,options);

        return network;
    }
    function addNode(toAdd) {
        Restangular.one('api/v1/').post('nodes',{"category":toAdd.group,"text":toAdd.text}).then((node)=>{
            node.label = node.text;
            node.group = node.category;
            nodes.add(node);
            Restangular.one('api/v1').post('links',{'from_node_id':toAdd.fromNodeId,'to_node_id':node.id}).then((link)=>{
                link.from = link.from_node_id;
                link.to = link.to_node_id;
                link.color = {inherit:'to'};
                links.add(link)
            });
        })
    }
    function deleteNode(id) {
        Restangular.one('api/v1/nodes',id).remove().then((node)=>{
            console.log(node);
            nodes.remove(id);
        });
    }


};


