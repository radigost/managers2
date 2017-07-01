/**
 * Created by user on 05.01.17.
 */
import './RestService';
let __ = new WeakMap();
class Npc{
  constructor(RestService) {
    __.set(this,{
      RestService:RestService,
      type : 'npc',
      currentNpc: {},
      npcList : {}
    });
  }

  get type(){
    return __.get(this).type;
  }

  get currentNpc(){
    return __.get(this).currentNpc;
  }

  get npcList(){
    return __.get(this).npcList;
  }

  selectCurrent(id) {
      this.getNpc(id).then((res)=> __.get(this).currentNpc = res);
  }

  getCurrentNpc() {
    return __.get(this).currentNpc;
  }

  getNpc(id) {
    return new Promise((resolve,reject)=>{
      if(__.get(this).npcList[id]){
        resolve(__.get(this).npcList[id])
      } 
      else{
        __.get(this).RestService.get('npc/'+ id).then((res)=>{
          __.get(this).npcList[id] = res;
          resolve(__.get(this).npcList[id]);
        });
      } 
    });
  }

}

Npc.$inject = ['RestService'];
angular.module('app').service('Npc',  Npc);





