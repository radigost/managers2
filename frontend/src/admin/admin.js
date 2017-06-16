

let template = require('./admin.pug');
import './AdminService';


class  AdminCtrl{
  constructor(adminService)  {
    Object.assign(this,{
        users:adminService.users,
        adminService:adminService
    });
  }

  $onInit(){
    this.adminService.init().then(()=>{
          this.users = this.adminService.users
    });
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