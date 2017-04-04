/**
 * Created by user on 05.01.17.
 */
angular.module('app').service('Npc',  Npc);

Npc.$inject = ['Restangular', '$q'];

function Npc(Restangular,q) {
  var type = 'npc',
  currentNpc = {},
  npcList = {};

  var service = {
    type:type,
    initNew:initNew,
    getNpc:getNpc,
    selectCurrent:selectCurrent,
    getCurrentNpc:getCurrentNpc,
  };
  return service;


  //factory method
  function initNew(Restangular, q) {
    return new Npc(Restangular, q);
  }
  function selectCurrent(id) {
      getNpc(id).then((res)=> currentNpc = res);
  }
  function getCurrentNpc() {
    return currentNpc;
  }
  function getNpc(id) {
    var defer = q.defer();
    npcList[id] ? defer.resolve(npcList[id]) :  Restangular.one('api/v1/npc/', id).get().then((res)=>{
      npcList[id] = res;
     defer.resolve(npcList[id]);
    });
    return defer.promise;
  }



};




