
var CompanyListTpl = require('./companyList.pug');


class CompanyListCtrl{
    constructor(service) {
        this.service = service;
    }

    goToCompany(id){
        this.$router.navigate(['CompanyDetail',{companyId:id}]);
    }
}

CompanyListCtrl.$inject = ['gameService'];

angular.module('app').component('companyList',{
    bindings:{$router:'<'},
    template: CompanyListTpl(),
    controller :CompanyListCtrl,
    // controllerAs:'ctrl'
});