/**
 * Created by user on 05.01.17.
 */
// import * as angular from "angular";
// import {GameService} from "./gameService";
// import IComponentOptions = angular.IComponentOptions;
var gameTpl = require('./game.pug');

require('../Components/playerInfo/playerInfo');

require('./gameService');

require('./companyList/companyList');

require('./companyDetail/companyDetail');

require('./profile/profile');



angular.module('app').component('game',{
  bindings:{
    $router:'<'
  },
  template:gameTpl(),
  controller :GameCtrl,
  controllerAs:'ctrl',
  $routeConfig: [
    {
      path: '/',
      name: 'CompanyList',
      component: 'companyList',
      useAsDefault: true
    }, {
      path: '/company-detail',
      name: 'CompanyDetail',
      component: 'companyDetail'
    }, {
      path: '/profile',
      name: 'Profile',
      component: 'profile'
    }
  ]
});
GameCtrl.$inject = ['gameService'];
function GameCtrl(service)  {
  this.gameName = "Основной экран";
  this.$routerOnActivate =function() {
    service.init();
  }

};





