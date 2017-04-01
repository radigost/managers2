/**
 * Created by user on 29.03.17.
 */
require('../lib/PlayerService');
require('../lib/NpcService');
angular.module('app').service('TalkService', TalkService);

TalkService.$inject = ['Restangular', 'Player','Npc','$q'];
function TalkService(Restangular,player,npc,q) {

    var inited = false,
    time,
    history = [],
    result = {

    };

    var service =  {
        getPlayer:getPlayer,
        getNpc:getNpc,
        getTime:getTime,
        getHistory:getHistory,
        getPlayerQuestions:getPlayerQuestions,
        init:init,
        getNpcAnswers:getNpcAnswers,

        isStatus:isStatus,
        update:update
    };
    return service;
    function getPlayer(){
        return player;
    }
    function getNpc() {
        return npc.getCurrentNpc();
    }
    function getNpcAnswers() {
        return npc && npc.current && npc.current.text ? npc.current.text : '';

    }
    function getTime() {
        return time;
    }
    function getHistory() {
        return history;
    }
    function init() {
        time = 100;
        result = {
            end: false,
            type: ""
        };
        player.init();
        // var npcId = next.params.npcId;
        // npc.selectCurrent(npcId);

        q.all([
            player.loadNodes(),
            player.loadTree(),
            npc.loadNodes(),
            npc.loadTree()])
            .then((res)=>{
                update();
                inited = true;
            });

    }

    function update (questionId){
        console.log(questionId);
        if (questionId > 1) {
            time -= 30;
        }
        findAnswerForQuestion(questionId);
        checkForSuccess();
        writeHistory();
        fillNextArrayOfQuestions();
        writeHistory();
    }
    function getPlayerQuestions() {
        return player.questionArray;
    }
    function isStatus (name) {
        var itIs;
        itIs = false;
        if (result.type === name) {
            itIs = true;
        }
        return itIs;
    }

    function findAnswerForQuestion (questionId) {
        var startElement;
        if (!questionId || questionId === 1) {
            
            startElement = _.find(npc.tree, 'is_start');
            questionId = startElement.id;
            
        }
        if (questionId) {
            npc.findNode(questionId);
            player.findCurrent(questionId);
            npc.findCurrent();
        }
    }

    function fillNextArrayOfQuestions () {
        if (isStatus('failure')) {
            npc.fail();
            player.fail();
            time = 0;
        } else if (isStatus('success')) {
            npc.succeed();
            player.succeed();
            time = 0;
        }
        player.findNode(npc.current.id);
    }

    function checkForSuccess () {
        if (!npc.branch) {
            result.end = true;
            result.type = "failure";
        }
        if (npc.current) {
            if ((npc.current.type === "failure") || time <= 0) {
                result.end = true;
                result.type = "failure";
            }
            if (npc.current.type === "success") {
                result.end = true;
                result.type = "success";
            }
        }
    }

    function writeHistory () {
        var inHistory;
        console.log(player);
        if (player.current) {
            inHistory = _.find(history, {
                text: player.current.text
            });
        }
        if (!inHistory) {
            history.push(player.current);
        }
        inHistory = _.find(history, {
            text: npc.current.text
        });
        if (!inHistory) {
            history.push(npc.current);
        }
    }

}



