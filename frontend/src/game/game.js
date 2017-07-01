/**
 * Created by user on 05.01.17.
 */
// import * as angular from "angular";
// import {GameService} from "./gameService";
// import IComponentOptions = angular.IComponentOptions;
let gameTpl = require('./game.pug');

import '../Components/playerInfo/playerInfo';
import './gameService';
import './companyList/companyList';
import './companyDetail/companyDetail';
import './profile/profile';



class  GameCtrl{
  constructor(service)  {
    this.gameName = "Основной экран";
    // this.service=service;
    Object.assign(this,{
      service:service
    });
  }

  $routerOnActivate() {
      this.service.init();
  }

}

GameCtrl.$inject = ['gameService'];


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



