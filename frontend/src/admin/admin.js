

let template = require('./admin.pug');
import './AdminService';


class  AdminCtrl{
  constructor(adminService)  {
    Object.assign(this,{
        adminService:adminService
    });
  }

  $onInit(){
    this.adminService.init();
  }


}

AdminCtrl.$inject = ['AdminService'];
angular.module('app').component('admin',{
  bindings:{
    $router:'<'
  },
  template:template(),
  controller :AdminCtrl,
});