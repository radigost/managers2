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


import '../lib/PlayerService';
import '../lib/NpcService';
import './talkService';
import './talk.css';
var talkTpl = require('./talk.pug');



class TalkCtrl {
    constructor(TalkService, scope) {
        Object.assign(this,{
            gameName :"Окно переговоров",
            player : TalkService.getPlayer(),
            npc : TalkService.getNpc(),
            getHistory : TalkService.getHistory,
            getPlayerQuestions : TalkService.getPlayerQuestions,
            update : TalkService.update,
            getNpcAnswers : TalkService.getNpcAnswers,
            getTime : TalkService.getTime,
            TalkService:TalkService
        });
    }


    $routerOnActivate() {
        this.TalkService.init().then(() => {
            // if (this.TalkService.hasError()) {
            //     console.log(this.$router);
            //     // this.$router.navigate['Game','CompanyList'];
            //     alert('Не отвечают');
            //     this.$router.navigateByUrl('/game');
            // }
        });
    }

    notTheEnd() {
        return !(this.TalkService.isStatus('failure') || this.TalkService.isStatus('success') );
    }

    checkColor() {
        let f = "";
        if (this.TalkService.isStatus('failure')) {
            f = "failure";
        }
        if (this.TalkService.isStatus('success')) {
            f = "success";
        }
        return f;
    };
}


TalkCtrl.$inject = ['TalkService','$scope'];
angular.module('app').component('talk',{
    bindings:{
        $router:'<'
    },
    template:talkTpl(),
    controller :TalkCtrl,
    controllerAs:'ctrl'
});



