// import * as angular from "angular";
// import {GameService} from "../gameService";
// import IService = restangular.IService;
// import * as restangular from "restangular";
// import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */

var profileTpl = require('./profile.pug');

require('../gameService');


angular.module('app').component('profile',{
  bindings:{
    $router:'<'
  },
  template:profileTpl(),
  controller : ProfileCtrl,
  controllerAs:'ctrl'
});

ProfileCtrl.$inject = ['gameService'];

function ProfileCtrl(service)  {
  this.service = service

};

