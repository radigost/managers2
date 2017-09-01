import  menuTpl from './menu.pug';
import './menu.css';
import '../lib/AuthService';
import '../lib/RestService';
import '../lib/PlayerService';
import '../signin/signin';


const __ = new WeakMap();
class MenuCtrl{

  constructor(uibModal,Restangular,cookies,AuthService,RestService,player)  {
    __.set(this,{
      RestService:RestService,
      uibModal:uibModal,
      player:player
      
    });

    Object.assign(this,{
      AuthService:AuthService,
      canSeeEditor : false
    })
    
  }

   $onInit(){
      __.get(this).RestService.init().then(()=>{
        this.canSeeEditor = this.AuthService.canSeeEditor;
        __.get(this).player.getPlayers().then(()=>{
            this.players = __.get(this).player.players;
        });
        
      });
    }

    goToGame(playerId) {
      __.get(this).player.init(playerId);
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

MenuCtrl.$inject = ['$uibModal', 'Restangular', '$cookies','AuthService','RestService','Player'];

angular.module('app')
  .component('menu',{
    bindings:{
      $router:'<'
    },
    template:menuTpl(),
    controller: MenuCtrl,
  })
  .value('$routerRootComponent', 'app');

