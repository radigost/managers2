

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
        this.$scope = $scope;

        this.nodesDataSet = new vis.DataView(GraphService.nodes) ;
        this.nodesDataSet.on('*',  (event, properties, senderId)=> {
            this.updateList();
        });

        this.DialogueService = DialogueService;
        
        
    }

    $routerOnActivate() {
        this.$q.all([
            this.GraphService.init(),
            this.DialogueService.init()
            ]).then(()=>{
            this.network = this.GraphService.getNetwork();
            this.network.on("selectNode",  (params)=> {
                let sel = this.nodesDataSet.get(params.nodes[0]);
                console.log(sel['group'],this.groupToAdd);
                this.groupToAdd =  sel['group'] == 'player' ? 'npc' : 'player';
                console.log(this.groupToAdd);
                this.fromNodeId = params.nodes[0];
                this.updateList();
                this.$scope.$apply();
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
            text:this.label,
            type: this.type!='none' ? this.type : ''
        };
        this.GraphService.addNode(toAdd);
        this.type='none';
        this.label='';
    }

    deleteNode() {
        this.GraphService.deleteNode(this.fromNodeId);
    }

    updateList() {
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
    // dialogue
    createNewDialogue(name){
        this.DialogueService.createNewDialogue(name).then(()=>this.DialogueService.init());
        this.newDialogueName = '';
    }

    deleteDialogue(dialogue){
        this.DialogueService.deleteDialogue(dialogue).then(()=>this.DialogueService.init());
        
    }

    chooseDialogue(dialogue){
        let chosenDialogue = JSON.parse(dialogue);
        this.GraphService.init(chosenDialogue.id);
        
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







