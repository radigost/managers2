

require('../lib/NpcService');
/**
 * Created by user on 05.01.17.
 */


// Npc = require('../Class/npc.js');
//
// Player = require('../Class/player.ts');

var treeTpl = require('./tree.jade');

require('./modal');

angular.module('app').component('tree',{
    bindings:{
    $router:'<'
  },
  template:treeTpl(),
  controller : TreeCtrl,
  controllerAs: 'ctrl'
});

TreeCtrl.$inject =['Player', 'Npc', 'Restangular', '$q', '$uibModal', '$cookies'];
function TreeCtrl (player,Npc,Restangular,q,uibModal,cookies)
{
  this.player=player;

    this.tree = [];
    this.filterQ = false;


  this.$onInit =function() {
    this.player.init();
    this.npc = Npc.initNew(Restangular,q);
    return q.all([this.player.loadNodes(), this.player.loadTree(), this.npc.loadNodes(), this.npc.loadTree()]).then((function(_this) {
      return function(res) {
        return _this.makeTree(_this.player);
      };
    })(this));
  }

  this.deleteLeave = function (id) {
    var s = cookies.getAll();
    return Restangular.one('api/v1/nodes/', id).get().then((res)=> {
        return res.remove('', {
          'X-CSRFToken': s.csrftoken
        }).then(()=> {
          return this.$onInit();
        });
      });
  }

  this.openModal=function  (question) {
    this.modal = uibModal.open({
      size: 'md',
      component: 'modalComponent',
      resolve: {
        node:()=> {
          console.log(question);
          return question;
        },
        tree:()=> {
          var tree;
          if (question.category === 'npc') {
            return tree = this.player.nodes;
          } else {
            return tree = this.npc.nodes;
          };
        }
      }
    });
    return this.modal.result.then(()=> {
        return this.$onInit();
      });

  }

  this.makeTree=function (person) {
    var opponent;
    if (person) {
      if (person.type === 'player') {
        this.treeType = "Редактор ответов для Игрока";
        opponent = this.npc;
      } else if (person.type === 'npc') {
        this.treeType = "Редактор ответов для NPC";
        opponent = this.player;
      }
      this.tree = [];
      return _.forEach(opponent.nodes, (function(_this) {
        return function(node) {
          var nodesArray, qNode;
          nodesArray = [];
          qNode = _.find(person.tree, {
            id: node.id
          });
          if (qNode && qNode.choice.length > 0) {
            node.hasSiblings = true;
            _.forEach(qNode.choice, function(choice) {
              var t;
              t = _.find(person.nodes, {
                id: choice
              });
              return nodesArray.push(t);
            });
          }
          node.answers = nodesArray;
          return _this.tree.push(node);
        };
      })(this));
    }
  }

}





angular.module('app').filter('HasNoAnswer', function() {
  return function(data, filterQ) {
    var out;
    out = data;
    if (filterQ === true) {
      out = _.filter(data, (function(_this) {
        return function(element) {
          var ret;
          ret = (element.hasSiblings !== true) && (element.is_failure !== true) && (element.is_success !== true);
          return ret;
        };
      })(this));
    }
    return out;
  };
});

