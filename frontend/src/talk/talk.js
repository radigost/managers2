// import * as angular from "angular";
// import * as _ from "lodash";
// import {Player} from "../lib/player";
// import IService = restangular.IService;
// import * as restangular from "restangular";
// import IQService = angular.IQService;
// import {Npc} from "../lib/npc";
// import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */


require('../lib/PlayerService');
require('../lib/NpcService');
require('./talkService');

var talkTpl = require('./talk.pug');


angular.module('app').component('talk',{
  bindings:{
    $router:'<'
  },
  template:talkTpl(),
  controller :TalkCtrl,
  controllerAs:'ctrl'
});

TalkCtrl.$inject = ['TalkService'];
function TalkCtrl(service)
{
    this.gameName = "Окно переговоров";

    this.player=service.getPlayer();
    this.npc=service.getNpc();
    this.getHistory = service.getHistory;
    this.getPlayerQuestions = service.getPlayerQuestions;
    this.update = service.update;
    this.getNpcAnswers = service.getNpcAnswers;
    this.getTime = service.getTime;

    this.$routerOnActivate = function() {
        service.init();
    };
    
    this.notTheEnd  = function() {
        return !(service.isStatus('failure') || service.isStatus('success'));
    }

    this.checkColor=function () {
        var f;
        f = "";
        if (service.isStatus('failure')) {
            f = "failure";
        }
        if (service.isStatus('success')) {
            f = "success";
        }
        return f;
    };

    





};




// ---
// generated by coffee-script 1.9.2