import './menu/menu';
import './talk/talk';
import './tree/tree';
import './game/game';
import './newgame/newgame';
import './signup/signup';
import './signin/signin';
import './admin/admin';

const appTpl = require('./app.jade');
angular
    .module('app').component('app',{
        template:appTpl(),
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






