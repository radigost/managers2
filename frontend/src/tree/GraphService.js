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
        getNetwork:getNetwork
    };
    return graphService;

    function init() {
        var deferred = q.defer();
        Restangular.all('api/v1/nodes/').getList().then((res)=>{
            _.forEach(res,(node)=>{
                node.group = node.category;
            })
            nodes.add(res);
        });
        Restangular.all('api/v1/links').getList().then((res)=>{
            console.log(res);
            _.forEach(res,(link)=>{
                link.from = link.from_node_id;
                link.to = link.to_node_id;
                link.label = link.text;
            });
            links.add(res);
        })
        inited = true;
        console.log(_this);
        deferred.resolve();
        return deferred.promise;
    }
    function getNetwork() {
        var container= document.getElementById('mynetwork');
        var data = {
            nodes: nodes,
            edges: links
        };
        var options = {
            layout: {
                hierarchical: {
                direction: 'LR',
                sortMethod:'hubsize',
                //     levelSeparation:50,
                //     nodeSpacing:200
                }
            },
            edges:{
                arrows:{
                    to: true
                }
            },
            nodes:{
                shape:'box'
            },
            physics:{
                enabled:true,
                solver:'forceAtlas2Based'
            }
        };
        network = new vis.Network(container, data,options);
        return network;
    }



};


