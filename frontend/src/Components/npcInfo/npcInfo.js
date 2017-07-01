
/**
 * Created by user on 05.01.17.
 */


import  template from './npcInfo.pug';
import '../../lib/NpcService';



let __ = new WeakMap();
class NpcInfoCtrl{
  constructor(Npc,$timeout){
    __.set(this,{
      Npc:Npc,
      $timeout:$timeout
    });
    Object.assign(this,{
      npc : {}
    })
}

  $onInit() {
    __.get(this).Npc.getNpc(this.id).then((res)=>{
      __.get(this).$timeout(()=>this.npc = res);
    },(err)=>console.error(err));
  }

  talk() {
      __.get(this).Npc.selectCurrent(this.id);
      this.$router.navigate(['/Talk']);
  }

};

NpcInfoCtrl.$inject = ['Npc','$timeout'];
angular.module('app').component('npcInfo',{
  bindings:{
    $router:'<',
    id: '<'
  },
  template:template(),
  controller:NpcInfoCtrl,
  controllerAs:'ctrl'
});

