var menuTpl = require('./menu.jade');
var  modalTpl = require('./modal.jade');
// require('./modal');
require('../lib/AuthService');



angular.module('app')
  .component('menu',{
    bindings:{
      $router:'<'
    },
    template:menuTpl(),
    controller: MenuCtrl,
    controllerAs:'ctrl'
  })
  .value('$routerRootComponent', 'app');

MenuCtrl.$inject = ['$uibModal', 'Restangular', '$cookies','AuthService'];

function  MenuCtrl(uibModal,Restangular,cookies,AuthService)  {
  this.isLoggedIn = AuthService.isLoggedIn;
  this.logout = AuthService.logout;
  var vm = this;
  vm.canSeeEditor = false;
  vm.$onInit = function(){
    Restangular.one('api/v1/my/').get().then( function(res) {
        localStorage.setItem("userId",res.user_id);
        vm.canSeeEditor = res.see_editor;
    });

    Restangular.one('api/v1/persons').get().then(function (res){
        vm.players = res;
    });
  }
  vm.goToGame = function(playerId) {
    localStorage.setItem("playerId",playerId );
    vm.$router.navigate(['Game']);
  }
  vm.deletePerson = function(id) {
    var s =  cookies.getAll();
    return Restangular.one('api/v1/persons/' + id).remove('', {
      'X-CSRFToken': s.csrftoken
    }).then( function(res) { return vm.$onInit();});
  }
  vm.help = function() {
    return vm.modal = uibModal.open({
      controller: 'modalHelpCtrl',
      controllerAs: '$ctrl',
      template: modalTpl()
    });
  }


}

