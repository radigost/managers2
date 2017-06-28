import  menuTpl from './menu.jade';
import '../lib/AuthService';
import '../lib/RestService';

const __ = new WeakMap();
class MenuCtrl{

  constructor(uibModal,Restangular,cookies,AuthService,RestService)  {
    __.set(this,{
      RestService:RestService,
      uibModal:uibModal,
      
    });

    Object.assign(this,{
      AuthService:AuthService,
      canSeeEditor : false
    })
    
  }

   $onInit(){
      __.get(this).RestService.init().then(()=>{
        this.canSeeEditor = this.AuthService.canSeeEditor;
        this.players = __.get(this).RestService.players;
      });
    }

    goToGame(playerId) {
      localStorage.setItem("playerId",playerId );
      this.$router.navigate(['Game']);
    }

    logout(){
      this.AuthService.logout();
    }



    // deletePerson(id) {
    //   const s =  cookies.getAll();
    //   return Restangular.one('api/v1/persons/' + id).remove('', {
    //     'X-CSRFToken': s.csrftoken
    //   }).then( (res)=>this.$onInit() );
    // }

    // help() {
    //   return this.modal = __.get(this).uibModal.open({
    //     controller: 'modalHelpCtrl',
    //     controllerAs: '$ctrl',
    //     template: modalTpl()
    //   });
    // }
}

MenuCtrl.$inject = ['$uibModal', 'Restangular', '$cookies','AuthService','RestService'];

angular.module('app')
  .component('menu',{
    bindings:{
      $router:'<'
    },
    template:menuTpl(),
    controller: MenuCtrl,
  })
  .value('$routerRootComponent', 'app');

