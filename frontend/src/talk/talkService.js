/**
 * Created by user on 29.03.17.
 */
require('../lib/PlayerService');
require('../lib/NpcService');
angular.module('app').service('TalkService', TalkService);

TalkService.$inject = ['Restangular', 'Player','Npc','$q'];
function TalkService(Restangular,player,npc,q) {
    var questionId;
    var inited = false;
    var state = {
        time:undefined,
        history : [],
        result : {},
        questions:[],
        previousAnswer:{}
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
        state.result = {
            end: false,
            type: ""
        };

        player.init().then(()=>{
            update();
            inited = true
        });
    }
    function update (questionId){
      console.log(questionId);
      questionId = questionId||'';
      var params = {
        questionId:questionId
      }
        Restangular.one('api/v1/update').get(params).then((res)=>_.extend(state, res));
        // fakeUpdateFromServer().then((res)=> {
        //     _.extend(state, res);
        //     console.log(state);
        // });
    }
    function fakeUpdateFromServer() {
        var defer = q.defer();
        var test = {
            is_fail:true,
            is_success:true,
            questions:[
                {id:4,text:"Хорошая погодка, не правда ли?"},
                {id:5,text:"А как вам так нравится?"}
            ],
            previousAnswer:{text:"Да идите вы"},
            gameStats:{},
            time:50
        };
        defer.resolve(test);
        return defer.promise;

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
        if (state.result.type === name) {
            itIs = true;
        }
        return itIs;
    }


    // function findNode(questionId){
    //     var params = {filter:{"where":{"from_node_id":questionId}}};
    //     Restangular.all('api/v1/links').getList(params).then((res)=>console.log(res));
    // }
    // function findInitNode(questionId){
    //     var deferred = q.defer();
    //     var params = {filter:{"where":{"is_start":"true"}}};
    //     Restangular.all('api/v1/nodes').getList(params).then((res)=>{
    //         deferred.resolve(res[0]['id']);
    //     });
    //     return deferred.promise;
    //
    // }
    // function fillNextArrayOfQuestions () {
    //     if (isStatus('failure')) {
    //         npc.fail();
    //         player.fail();
    //         time = 0;
    //     } else if (isStatus('success')) {
    //         npc.succeed();
    //         player.succeed();
    //         time = 0;
    //     }
    //     player.findNode(npc.current.id);
    // }
    //
    // function checkForSuccess () {
    //     if (!npc.branch) {
    //         result.end = true;
    //         result.type = "failure";
    //     }
    //     if (npc.current) {
    //         if ((npc.current.type === "failure") || time <= 0) {
    //             result.end = true;
    //             result.type = "failure";
    //         }
    //         if (npc.current.type === "success") {
    //             result.end = true;
    //             result.type = "success";
    //         }
    //     }
    // }
    //
    // function writeHistory () {
    //     var inHistory;
    //     console.log(player);
    //     if (player.current) {
    //         inHistory = _.find(history, {
    //             text: player.current.text
    //         });
    //     }
    //     if (!inHistory) {
    //         history.push(player.current);
    //     }
    //     inHistory = _.find(history, {
    //         text: npc.current.text
    //     });
    //     if (!inHistory) {
    //         history.push(npc.current);
    //     }
    // }

}



