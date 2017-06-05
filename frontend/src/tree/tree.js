

/**
 * Created by user on 05.01.17.
 */

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
        this.hasNoStart = true;

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
            this.checkStartingPoint();
            this.network = this.GraphService.getNetwork();

            this.network.on("selectNode",  (params)=> {
                let sel = this.nodesDataSet.get(params.nodes[0]);
                // console.log(sel['group'],this.groupToAdd);
                this.groupToAdd =  sel['group'] == 'player' ? 'npc' : 'player';
                // console.log(this.groupToAdd);
                this.fromNodeId = params.nodes[0];
                this.updateList();
                this.getLinkedToNodes();
                this.$scope.$apply();
            });
        });
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

    showNodeOnNetwork() {
        this.network.focus(this.fromNodeId,{scale:1,    animation: {             // animation object, can also be Boolean
            duration: 1000,                 // animation duration in milliseconds (Number)
            easingFunction: "easeInOutQuad" // Animation easing function, available are:
        }  });
        this.network.selectNodes([this.fromNodeId]);
    }

    onChange() {
        this.showNodeOnNetwork();
        this.getLinkedToNodes();
    }

    addNode() {
        let toAdd = {
            group:this.groupToAdd,
            fromNodeId:this.fromNodeId,
            text:this.label,
            type: this.type!='none' ? this.type : ''
        };
        this.GraphService.addNode(toAdd).then(()=>{
            this.type='none';
            this.label='';
            this.onChange()
        });
        
    }

    addLink(id){
        this.GraphService.addLink({from:this.fromNodeId,to:id}).then(()=>this.onChange());
    }

    deleteLink(to){
        console.log(to.id);
        this.GraphService.deleteLink({from:this.fromNodeId,to:to.id}).then(()=>this.onChange());
    }

    deleteNode() {
        this.GraphService.deleteNode(this.fromNodeId);
    }

    updateList() {
        this.nodes = this.nodesDataSet.get({
            filter: (item) => {
                return (item.group != this.groupToAdd );
            }
        });
        this.oppositeNodes = this.nodesDataSet.get({
            filter:(item) => {
                return (item.group === this.groupToAdd );
            }
        });
        

    }


    checkStartingPoint(){
        this.hasNoStart = true;
        this.GraphService.nodes.forEach((item)=>{
            this.hasNoStart =  item.is_start ? false : this.hasNoStart ;
        });
        // this.hasNoStart ? alert("there is no Starting Point in this dialogue!") : '' ; 
    }

    notInList(id){
        return this.phraseList.find(phrase => phrase.id!=id);
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
        this.GraphService.init(chosenDialogue.id).then(res => this.checkStartingPoint());
        
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







