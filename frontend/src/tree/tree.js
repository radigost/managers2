

/**
 * Created by user on 05.01.17.
 */


// Npc = require('../Class/npc.js');
//
// Player = require('../Class/player.ts');
var vis = require('vis');

var template = require('./tree.jade');
import './tree.css';
import './modal';
import './GraphService';
import './DialogueService';
require('../lib/NpcService');


class TreeCtrl {
    constructor(player,Npc,Restangular,$q,uibModal,cookies,GraphService,$scope,DialogueService){
        this.GraphService = GraphService;
        
        this.groupToAdd = 'player';
        this.phraseList = [];
        this.$q = $q;

        this.nodesDataSet = new vis.DataView(GraphService.nodes) ;
        this.nodesDataSet.on('*',  (event, properties, senderId)=> {
            this.updateList();
        });

        this.DialogueService=DialogueService;
        this.DialogueService.init();
        
    }

    $routerOnActivate() {
        this.$q.all([this.GraphService.init()]).then(()=>{
            this.network = this.GraphService.getNetwork();
            this.network.on("selectNode",  (params)=> {
                let sel = this.nodesDataSet.get(params.nodes[0]);
                this.groupToAdd =  sel['group'] == 'player' ? 'npc' : 'player';
                this.fromNodeId = params.nodes[0];
                this.updateList();
            });
        });
    }

    onChange() {
        this.showNodeOnNetwork();
        this.getLinkedToNodes()
    }

    addNode() {
        let toAdd = {
            group:this.groupToAdd,
            fromNodeId:this.fromNodeId,
            text:this.label
        };
        this.GraphService.addNode(toAdd);
    }

    deleteNode() {
        this.GraphService.deleteNode(this.fromNodeId);
    }

    updateList() {
        console.log(this.selectedDialogue);
        this.nodes = this.nodesDataSet.get({
            filter:  (item) => (item.group != this.groupToAdd && item.type != 'failure' && item.type!='success')
        });
    }

    showNodeOnNetwork() {
        this.network.focus(this.fromNodeId,{scale:1,    animation: {             // animation object, can also be Boolean
            duration: 1000,                 // animation duration in milliseconds (Number)
            easingFunction: "easeInOutQuad" // Animation easing function, available are:
        }  });
        this.network.selectNodes([this.fromNodeId]);
    }

    getLinkedToNodes() {
        let nodeIds = [];
        let nodesFromLinks = this.GraphService.links.get({
            filter: (link) => {
                link.from == this.fromNodeId ? nodeIds.push(link.to): '';
                return link.from == this.fromNodeId;
            }
        });
        this.phraseList = this.GraphService.nodes.get(nodeIds);
    }
}

TreeCtrl.$inject =['Player', 'Npc', 'Restangular', '$q', '$uibModal', '$cookies','GraphService','$scope','DialogueService'];

angular.module('app').component('tree',{
    bindings:{
    $router:'<'
  },
  template:template(),
  controller : TreeCtrl,
});







