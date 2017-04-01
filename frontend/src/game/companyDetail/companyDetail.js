// import * as angular from "angular";
// import {GameService} from "../gameService";
// import {Company} from "../../lib/Company";
// import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */

var companyDetailTpl = require('./companyDetail.pug');



require('../../Components/npcInfo/npcInfo');
require('../../lib/Company');

require('../gameService');

angular.module('app').component('companyDetail',{
  bindings:{
    $router:'<'
  },
  template:companyDetailTpl(),
  controller :CompanyDetailCtrl,
  controllerAs:'ctrl'
});

CompanyDetailCtrl.$inject= ['gameService','Company'];

function CompanyDetailCtrl(service,company) {
    this.gameName = "Экран информации о компании";
    this.company = company;

  this.$routerOnActivate = function(next) {
    this.company.selectCurrent(next.params.companyId);
  }

  this.goToTalk=function(id) {
    this.$router.navigate([
      'Talk', {
        npcId: id
      }
    ]);
  }


};



