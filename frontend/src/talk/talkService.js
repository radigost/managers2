/**
 * Created by user on 29.03.17.
 */
import '../lib/PlayerService';
import '../lib/NpcService';
import '../lib/RestService';
angular.module('app').service('TalkService', TalkService);

TalkService.$inject = ['RestService', 'Player','Npc','$q','$timeout'];
function TalkService(RestService,player,npc,q,$timeout) {
    var inited = false;
    var router;
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

        isStatus:isStatus,

        setRouter:setRouter,
        hasError:hasError
    };
    return service;
    function init() {
        return new Promise ((resolve,reject)=>{
            state.time = 100;
            state.end= false;
            state.type= "";
            state.error = false;
            player.init().then(()=>{
                update().then(()=>{
                    inited = true;
                    resolve()
                });
            });
        })
    }
    function update (questionId){
      questionId = questionId||'';
      const params = {
        questionId:questionId
      }
      return new Promise((resolve,reject)=>{
        RestService.get('update',params).then((res)=>{
            $timeout(()=>{
                _.extend(state, res);
                resolve();
            });
        });
      })
        

    }
    function hasError(){
        console.log(!!state.error,state);
        return !!state.error;
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

    function setRouter(newrouter){
        router = newrouter;
    }




    function isStatus (name) {
        return state.type === name;
    }



}



