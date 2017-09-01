

angular
    .module('app',[
      'restangular',
      'ngComponentRouter',
      'ui.bootstrap',
      'ngCookies',
      'ngSanitize',
      'ui.select',
      'ngMaterial'
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
    })
    .directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                element.removeClass(':focused')
                                scope.$eval(attrs.ngEnter);
                        });
                        
                        event.preventDefault();
                }
            });
        };
    })
    .run(function ($rootScope,$timeout) {
        $rootScope.$on('$viewContentLoaded', ()=> {
          $timeout(() => {
            componentHandler.upgradeAllRegistered();
          })
        })
      });



