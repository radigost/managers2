/**
 * Created by user on 29.03.17.
 */
require('../lib/PlayerService');
require('../lib/NpcService');
angular.module('app').service('TalkService', TalkService);

TalkService.$inject = ['Restangular', 'Player','Npc','$q'];
function TalkService(Restangular,player,npc,q) {
    var inited = false;
    var state = {
        time:undefined,
        history : [],
        result : {},
        questions:[],
        previousAnswer:{},
    };
    var service =  {
        init:init,
        update:update,
        getPlayer:getPlayer,
        getNpc:getNpc,

        getTime:getTime,
        getHistory:getHistory,

        getPlayerQuestions:getPlayerQuestions,
        getNpcAnswers:getNpcAnswers,

        isStatus:isStatus
    };
    return service;
    function init() {
        state.time = 100;
        state.end= false;
        state.type= "";
        player.init().then(()=>{
            update();
            inited = true
        });
    }
    function update (questionId){
      questionId = questionId||'';
      var params = {
        questionId:questionId
      }
        Restangular.one('api/v1/update').get(params).then((res)=>_.extend(state, res));

    }

    function getPlayer(){
        return player;
    }
    function getNpc() {
        return npc.getCurrentNpc();
    }
    function getNpcAnswers() {
        return state.previousAnswer;

    }
    function getTime() {
        return state.time;
    }
    function getHistory() {
        return state.history;
    }
    function getPlayerQuestions() {
        return state.questions;
    }




    function isStatus (name) {
        var itIs;
        itIs = false;
        if (state.type === name) {
            itIs = true;
        }
        return itIs;
    }



}



