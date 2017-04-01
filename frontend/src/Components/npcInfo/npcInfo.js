
/**
 * Created by user on 05.01.17.
 */


var NpcInfoTpl = require('./npcInfo.pug');
require('../../lib/NpcService');


angular.module('app').component('npcInfo',{
  bindings:{
    $router:'<',
    id: '<'
  },
  template:NpcInfoTpl(),
  controller:NpcInfoCtrl,
  controllerAs:'ctrl'
});

NpcInfoCtrl.$inject = ['Restangular','Npc','$q'];
function NpcInfoCtrl(Restangular,Npc,q){
  var npc;

  this.$onInit = function() {
    Npc.getNpc(this.id).then(res=>this.npc = res);
  }
  this.talk = function () {
      Npc.selectCurrent(this.id);
      // console.log(this.$router);
      this.$router.navigate(['/Talk']);
  }
};


