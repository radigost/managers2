// import * as angular from "angular";
// import * as restangular from "restangular";
// import {storage} from "angular";
// import {Player} from "../lib/player";
/**
 * Created by user on 05.01.17.
 */
require('../lib/PlayerService');
angular.module('app').service('gameService', GameService);

GameService.$inject = ['Restangular', 'Player'];
function GameService(Restangular,player) {

    var inited,companies;

    var inited = false;

    var service =  {
        inited:inited,
        companies:companies,
        player:player,
        init:init
    };
    return service;

    function init() {
        player.init();
        Restangular.one('api/v1/companies/').get().then(function(res) {
          service.companies = res;
          inited = true;
        });
    }
}



