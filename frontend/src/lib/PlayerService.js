/**
 * Created by user on 05.01.17.
 */

import './RestService';
angular.module('app').service('Player', Player);

Player.$inject = ['RestService', '$q'];

function Player(RestService,q) {
  var inited = false;
  var id;
  var type = 'player',
  name = "",
  fakeName = "Иван Иванович",
  company = "",
  money = "",
  position = "";

  var service = {
      type:type,
      name:name,
      fakeName:fakeName,
      company:company,
      money:money,
      position:position,

      init:init,
      choosePlayer:choosePlayer,
    };
  return service;

  function init() {
    // TODO why do i need this local storage anymore?
    id = localStorage.getItem("playerId");
    return new Promise((resolve,reject)=>{
      if (!inited) {
        RestService.get('persons/'+id).then((res)=>{
            _.extend(this, res);
            inited = true;
            resolve();
        });
      }
      resolve();
    });
  }

  function choosePlayer(playerAvatarID) {
    if (playerAvatarID) {
      return this.playerAvatarID = playerAvatarID;
    }
  }


};


