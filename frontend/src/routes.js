import './menu/menu';
import './talk/talk';
import './tree/tree';
import './game/game';
import './newgame/newgame';
import './signup/signup';
import './signin/signin';
import './admin/admin';
import './lib/AuthService';
import './lib/PlayerService';
const appTpl = require('./app.pug');



class AppCtrl{
    constructor($mdSidenav,AuthService,$timeout,Player,$rootRouter){
        Object.assign(this,{
            $mdSidenav:$mdSidenav,
            $timeout:$timeout,
            AuthService:AuthService,
            Player:Player,
            $rootRouter:$rootRouter
        })
    }
    toggle(){
        this.$mdSidenav('left').toggle();
        this.players = this.Player.players;
        // console.log(this.Player.players);
    }
    logout(){
        this.$mdSidenav('left').toggle();
        console.log(this);
        this.$rootRouter.navigate(['Menu']);
        this.AuthService.logout();

    }

    goTo(path){
        this.$mdSidenav('left').toggle();
        this.$rootRouter.navigate(path);

    }

}

AppCtrl.$injector = ['$mdSidenav','AuthService','$timeout','Player','$rootRouter'];
angular
    .module('app').component('app',{
        template:appTpl(),
        controller:AppCtrl,
        bindings:{
          $router:'<'
        },
        $routeConfig: [
            {path: '/', name: 'Menu', component: 'menu',useAsDefault:true},
            {path: '/talk/', name: 'Talk', component: 'talk'},
            {path: '/tree/', name: 'Tree', component: 'tree'},
            {path: '/newgame/', name: 'NewGame', component: 'newgame'},
            {path: '/game/...', name: 'Game', component: 'game'},
            {path: '/signup', name: 'SignUp', component: 'signup'},
            {path: '/signin', name: 'SignIn', component: 'signin'},
            {path: '/admin', name: 'Admin', component: 'admin'}
        ]
        })
        .value('$routerRootComponent', 'app');






