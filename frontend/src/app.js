

angular
    .module('app',[
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
    }) ;



