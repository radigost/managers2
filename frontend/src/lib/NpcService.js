// import * as angular from "angular";
// import IQService = angular.IQService;
// import IService = restangular.IService;
// import * as restangular from "restangular";
// import * as _ from "lodash";
/**
 * Created by user on 05.01.17.
 */
angular.module('app').service('Npc',  Npc);

Npc.$inject = ['Restangular', '$q'];

function Npc(Restangular,q) {
  var type = 'npc',
  tree = [],
  nodes = [
    {
      id: 1,
      text: "Да, здравствуйте, чем можем вам помочь?",
      used: false
    }, {
      id: 2,
      text: "Да отошел он, не знаем когда будет...",
      used: false
    }, {
      id: 3,
      text: "Да не работают такие у нас...",
      used: false
    }, {
      id: 7,
      text: "И вам добрый день!",
      used: false
    }, {
      id: 4,
      text: "А кто его спрашивает?",
      used: false
    }, {
      id: 5,
      text: "Алло?",
      used: false
    }, {
      id: 6,
      text: "Меня зовут PERSONNAME",
      used: false
    }, {
      id: 8,
      text: "Вы знаете, он сейчас находится на совещании, но вы можете оставить информацию о вашей компании у нас на электронной почте",
      used: false
    }, {
      id: 9,
      text: "%EMAIL%, Можете высысылать на него информацию, и мы с вами свяжемся, если нам будет интересно",
      used: false
    }, {
      id: 10,
      text: "Нет не надо нас набирать, мы вас сами наберем, до свидания!",
      used: false,
      type: "failure"
    }, {
      id: 11,
      text: "Ну тогда всего доброго!",
      used: false,
      type: "failure"
    }, {
      id: 12,
      text: "Ну знаете, сегодня скорее всего уже не освободится, но можете позвонить завтра в районе обеда, попробую вас с ним соединить",
      used: false,
      type: "failure"
    }, {
      id: 13,
      text: "Да, конечно. Давайте соединю",
      used: false,
      type: "success"
    }, {
      id: 14,
      text: "Я извиняюсь, но мне кажется вы не долны сюда больше звонить, всего доброго!",
      used: false,
      type: "failure"
    }, {
      id: 15,
      text: "Я могу продиктовать вам электронную почту и вы вышлите на нее ваше предложение",
      used: false
    }, {
      id: 16,
      text: "А что вам конкретно нужно, вы хотите что то предложить?",
      used: false
    }, {
      id: 17,
      text: "А он о вас знает, как вас представить?",
      used: false
    }
  ],
  loadedData = [],
  currentNpc = {},
  npcList = {};


  var service = {

    type:type,
    tree:tree,
    nodes:nodes,
    loadedData:loadedData,
    getNpc:getNpc,

    getCurrentNpc:getCurrentNpc,
    initNew:initNew,
    loadNodes:loadNodes,
    loadTree:loadTree,
    findNode:findNode,
    findCurrent:findCurrent,
    selectCurrent:selectCurrent,
    fail:fail,
    succeed:succeed

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

  //working with dialog
  function loadNodes() {
    var def = q.defer();
    var params = {filter:{"where":{"category":"npc"}}};
    Restangular.one('api/v1/nodes').get(params).then(
      (res)=> {
        this.nodes = res;
        def.resolve();
      });
    return def.promise;
  }

  function loadTree() {
    var def = q.defer();
    var params = {filter:{"where":{"category":"player"}}};
    Restangular.one('api/v1/nodes').get(params).then(
      (res)=> {
        this.tree = res;
        def.resolve();
    });
    return def.promise;
  }

  function findNode(questionId) {
     this.branch = _.find(this.tree, {
      id: questionId
    });
    console.log(this.branch);
    return this.branch;
  }

  function findCurrent() {
    var choiceIndex, name;

    choiceIndex = _.sample(this.branch.choice);
    
    this.current = _.find(this.nodes, {
      id: choiceIndex
    });
    if (this.current && this.current.text.indexOf("PERSONNAME")) {
      name = this.name;
      return this.current.text = _.replace(this.current.text, 'PERSONNAME', name);
    }
    console.log(this.current);
  }



  function fail() {
    return this.current = {
      id: null,
      text: "Извините, Всего доброго! (звук кладущейся трубки)"
    };
  }

  function succeed() {
    return this.current = {
      id: null,
      text: "Давайте соединю"
    };
  }


};




