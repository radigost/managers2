/**
 * Created by user on 05.01.17.
 */

angular.module('app').service('Player', Player);

Player.$inject = ['Restangular', '$q'];

function Player(Restangular,q) {
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
    var d = q.defer();
    id = localStorage.getItem("playerId");
    if (!inited) {
        Restangular.one('api/v1/persons/', id).get().then((res)=>{
            _.extend(this, res);
            inited = true;
            d.resolve();
        });
    }
    else {d.resolve();}
    return d.promise;
  }

  function choosePlayer(playerAvatarID) {
    if (playerAvatarID) {
      return this.playerAvatarID = playerAvatarID;
    }
  }


};


