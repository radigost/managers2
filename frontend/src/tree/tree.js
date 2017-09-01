

/**
 * Created by user on 05.01.17.
 */

var vis = require('vis');

var template = require('./tree.jade');
import './tree.css';
import './GraphService';
import './DialogueService';
import '../lib/NpcService';


class TreeCtrl {
    constructor(player,Npc,$q,uibModal,cookies,GraphService,$scope,DialogueService){
        this.GraphService = GraphService;
        this.groupToAdd = 'player';
        this.phraseList = [];
        this.$q = $q;
        this.$scope = $scope;
        this.hasNoStart = false;
        this.state = {
            isEditingNode: false
        };

        this.nodesDataSet = new vis.DataView(GraphService.nodes) ;
        this.nodesDataSet.on('*',  (event, properties, senderId)=> {
            this.updateList();
            
        });

        this.DialogueService = DialogueService;
        this.showNewDialogue = false;
        this.addOrEdit = 'new';
        this.type='none';

        
        
    }

    $routerOnActivate() {
        this.$q.all([
            this.GraphService.init(),
            this.DialogueService.init()
            ]).then(()=>{
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

    selectFromNode(node){
        this.fromNodeId = node.id;
        this.onChange()
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
            this.onChange();
            this.fromNodeId = null;
        });
    }

    deleteNode(id) {
        id = id || this.fromNodeId;
        this.GraphService.deleteNode(id);
    }

    editNode(id){
        this.state.isEditingNode = true;
        let node = this.GraphService.nodes.get({filter:(node)=>node.id==id})[0];
        this.editingNode = node;
        this.editingLabel=node.label;
    }

    updateNode(node){
        node.label =  this.editingLabel;
        this.GraphService.updateNode(node).then(()=>{
            this.state.isEditingNode = false;
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
        this.DialogueService.createNewDialogue(name).then((dialogue)=>{
            this.DialogueService.init();
            this.chooseDialogue(dialogue);
        });
        this.newDialogueName = '';
        this.showNewDialogue = false;
    }

    showDialogue(){
        this.showNewDialogue = true;
    }

    deleteDialogue(dialogue){
        this.DialogueService.deleteDialogue(dialogue).then(()=>this.DialogueService.init());
        
    }

    chooseDialogue(dialogue){
        this.selectedDialogue = (dialogue);
        // let chosenDialogue = JSON.parse(dialogue);
        this.GraphService.init(dialogue.id).then(res => this.checkStartingPoint());
        this.fromNodeId = null;
        
    }
}

TreeCtrl.$inject =['Player', 'Npc', '$q', '$uibModal', '$cookies','GraphService','$scope','DialogueService'];

angular.module('app').component('tree',{
    bindings:{
        $router:'<'
    },
    template:template(),
    controller : TreeCtrl,
});







