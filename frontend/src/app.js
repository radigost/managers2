//styles and fonts
require("styles/style.css");


//modules
require("angular");
require("restangular");
require("@angular/router/angular1/angular_1_router");
// import "@angular/upgrade/upgrade";
require("angular-ui-bootstrap");
require("angular-cookies");
require("angular-sanitize");
require("ui-select");
require("../node_modules/bootstrap/dist/css/bootstrap.css");
require("../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css");
require("../node_modules/font-awesome/css/font-awesome.min.css");




const appTpl = require('./app.jade');
require('angular');
angular
    .module('app',
    [
      'restangular',
      'ngComponentRouter',
      'ui.bootstrap',
      'ngCookies',
      'ngSanitize',
      'ui.select'
    ])
    .config(function($interpolateProvider) {
      $interpolateProvider.startSymbol('[[');
      $interpolateProvider.endSymbol(']]');
    })
    .config(function(RestangularProvider) {
      return RestangularProvider.setRequestSuffix("/");
    })
    .config(function($locationProvider) {
      return $locationProvider.html5Mode(false);
}   )




require('./menu/menu');
require('./talk/talk');
require('./tree/tree');
require('./game/game');
require('./newgame/newgame');





angular
    .module('app').component('app',{
        template:appTpl(),
        $routeConfig: [
            {path: '/', name: 'Menu', component: 'menu',useAsDefault:true},
            {path: '/talk/', name: 'Talk', component: 'talk'},
            {path: '/tree/', name: 'Tree', component: 'tree'},
            {path: '/newgame/', name: 'NewGame', component: 'newgame'},
            {path: '/game/...', name: 'Game', component: 'game'}
        ]
        })
        .value('$routerRootComponent', 'app');



angular.element(document).ready(function() {
    angular.bootstrap(document, ["app"]);
});


