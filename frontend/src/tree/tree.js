

require('../lib/NpcService');
/**
 * Created by user on 05.01.17.
 */


// Npc = require('../Class/npc.js');
//
// Player = require('../Class/player.ts');

var template = require('./tree.jade');

require('./modal');
require('./GraphService');

angular.module('app').component('tree',{
    bindings:{
    $router:'<'
  },
  template:template(),
  controller : TreeCtrl,
});

TreeCtrl.$inject =['Player', 'Npc', 'Restangular', '$q', '$uibModal', '$cookies','GraphService'];
function TreeCtrl (player,Npc,Restangular,$q,uibModal,cookies,GraphService)
{
  this.$onInit=function () {
    $q.all([GraphService.init()]).then(()=>{
     GraphService.getNetwork();
    });
  }


}







