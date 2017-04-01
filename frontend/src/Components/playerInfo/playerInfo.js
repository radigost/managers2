// import * as angular from "angular";
// import IService = restangular.IService;
// import * as restangular from "restangular";
// import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */

var PlayerInfoTpl  = require('./playerInfo.pug');


angular.module('app').component('playerInfo',{
    bindings:{
      $router:'<'
  },
  template:PlayerInfoTpl(),
  controller :PlayerInfoCtrl,
  controllerAs:'ctrl'
});

PlayerInfoCtrl.$inject =  ['Restangular','Player'];
function PlayerInfoCtrl(Restangular,player) {
  this.player = player;
  console.log(this);
};


