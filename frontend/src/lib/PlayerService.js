/**
 * Created by user on 05.01.17.
 */

angular.module('app').service('Player', Player);

Player.$inject = ['Restangular', '$q'];

function Player(Restangular,q) {
  var inited = false;
    var type = 'player',
    name = "",
    fakeName = "Иван Иванович",
    company = "",
    money = "",
    position = "",
    nodes = [],
    tree = [];
  var service = {
  type:type,
  name:name,
  fakeName:fakeName,
  company:company,
  money:money,
  position:position,
  nodes:nodes,
  tree:tree,

  init:init,
  loadNodes:loadNodes,
  loadTree:loadTree,
  findNode:findNode,
  findCurrent:findCurrent,
  choosePlayer:choosePlayer,
  fail:fail,
  succeed:succeed
};
  return service;
  function init() {
    id = localStorage.getItem("playerId");
    if (!inited) {
        Restangular.one('api/v1/persons/', id).get().then((function(_this){
            return function(res)  {
              _.extend(_this, res);
              inited = true;
            }
        })(this));
    }
  }
  function choosePlayer(playerAvatarID) {
    if (playerAvatarID) {
      return this.playerAvatarID = playerAvatarID;
    }
  }



  //Working with dialog

  function loadNodes () {
    var def = q.defer();
    var params = {filter:{"where":{"category":"player"}}};
    Restangular.one('api/v1/nodes').get(params).then(function(res) {
        service.nodes = res;
        def.resolve();
      }
    );
    return def.promise;
  }

  function loadTree () {
    var def;
    def = q.defer();
    var params = {filter:{"where":{"category":"npc"}}};
    Restangular.one('api/v1/nodes').get(params).then((function(_this) {
      return function(res) {
        _this.tree = res;
        return def.resolve();
      };
    })(this));
    return def.promise;
  };

  function findNode(questionId) {
    this.branch = _.find(this.tree, {
      id: questionId
    });
    if (this.branch) {
      this.questionArray = _.filter(this.nodes, (function(_this) {
        return function(element) {
          return _.includes(_this.branch.choice, element.id);
        };
      })(this));
      _.forEach(this.questionArray, (function(_this) {
        return function(element) {
          var name;
          if (element.text.indexOf("%USERNAME%")) {
            name = _this.name;
            return element.text = _.replace(element.text, '%USERNAME%', name);
          }
        };
      })(this));
      _.forEach(this.questionArray, (function(_this) {
        return function(element) {
          var name;
          if (element.text.indexOf("%FAKEUSERNAME%")) {
            name = _this.fakeName;
            return element.text = _.replace(element.text, '%FAKEUSERNAME%', name);
          }
        };
      })(this));
      return _.forEach(this.questionArray, (function(_this) {
        return function(element) {
          var name;
          if (element.text.indexOf("%LPRNAME%")) {
            name = "Михаила Сергеевича";
            element.text = _.replace(element.text, '%LPRNAME%', name);
            return _this.fakeName;
          }
        };
      })(this));
    } else {
      return this.questionArray = [];
    }
  }

  function findCurrent(questionId) {
    
     this.current = _.find(this.nodes, {
      id: questionId
    });
    console.log(this.current);
    return this.current;
  }

  function fail() {
    return this.current = {
      id: null,
      text: "Эммм..ну до свиданья"
    };
  }

  function succeed(){
    return this.current = {
      id: null,
      text: "Да, спасибо большое"
    };
  }


};


