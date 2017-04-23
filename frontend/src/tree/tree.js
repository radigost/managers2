
var vis = require('vis');
require('../lib/NpcService');
/**
 * Created by user on 05.01.17.
 */


// Npc = require('../Class/npc.js');
//
// Player = require('../Class/player.ts');

var template = require('./tree.jade');
require('./tree.css');
require('./modal');
require('./GraphService');

angular.module('app').component('tree',{
    bindings:{
    $router:'<'
  },
  template:template(),
  controller : TreeCtrl,
});

TreeCtrl.$inject =['Player', 'Npc', 'Restangular', '$q', '$uibModal', '$cookies','GraphService','$scope'];
function TreeCtrl (player,Npc,Restangular,$q,uibModal,cookies,GraphService,$scope){
    var _this = this;
    var network;

    var nodesDataSet = new vis.DataView(GraphService.nodes) ;
    _this.groupToAdd = 'player';
    _this.updateList = updateList;
    _this.phraseList = [];


    nodesDataSet.on('*', function (event, properties, senderId) {
        updateList();
    });

    this.$routerOnActivate=function () {
        $q.all([GraphService.init()]).then(()=>{
            network = GraphService.getNetwork();
            network.on("selectNode", function (params) {
                var sel = nodesDataSet.get(params.nodes[0]);
                _this.groupToAdd =  sel['group'] == 'player' ? 'npc' : 'player';
                _this.fromNodeId = params.nodes[0];
                updateList();
                // console.log(_this);
            });
        });
    };

    this.onChange = function () {
        showNodeOnNetwork();
        getLinkedToNodes()
    };

    this.addNode = function () {
        var toAdd ={
            group:_this.groupToAdd,
            fromNodeId:_this.fromNodeId,
            text:_this.label
        };
        GraphService.addNode(toAdd);
    };

    this.deleteNode = function () {
        GraphService.deleteNode(_this.fromNodeId);
    };

    function updateList() {
        _this.nodes = nodesDataSet.get({
            filter: function (item) {
                return (item.group != _this.groupToAdd && item.type != 'failure' && item.type!='success');
            }
        });
    }
    function showNodeOnNetwork() {
        network.focus(_this.fromNodeId,{scale:1,    animation: {             // animation object, can also be Boolean
            duration: 1000,                 // animation duration in milliseconds (Number)
            easingFunction: "easeInOutQuad" // Animation easing function, available are:
        }  });
        network.selectNodes([_this.fromNodeId]);
    }
    function getLinkedToNodes() {
        var nodeIds = [];
        var nodesFromLinks = GraphService.links.get({
            filter:function (link) {
                link.from == _this.fromNodeId ? nodeIds.push(link.to): '';
                return link.from == _this.fromNodeId;
            }
        });
        _this.phraseList = GraphService.nodes.get(nodeIds);
    }


}







