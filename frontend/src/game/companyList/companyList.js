
var CompanyListTpl = require('./companyList.pug');

angular.module('app').component('companyList',{
    bindings:{$router:'<'},
    template: CompanyListTpl(),
    controller :CompanyListCtrl,
    controllerAs:'ctrl'
});

CompanyListCtrl.$inject = ['gameService'];

function CompanyListCtrl(service) {
    this.service = service;

};



