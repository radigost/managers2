/**
 * Created by user on 05.01.17.
 */

angular.module('app')
    .service('AuthService', AuthService);

AuthService.$inject = ['Restangular', '$q'];

function AuthService(Restangular,q) {
  var inited = false;
  var token = null;
  var loggedIn = false;
  

  var authService = {
      init:init,
      login:login,
      logout:logout,
      isLoggedIn:isLoggedIn
    };
  return authService;

  function init() {
    var d = q.defer();
    id = localStorage.getItem("playerId");
    if (!inited) {
            inited = true;
            d.resolve();
    }
    else {d.resolve();}
    return d.promise;
  }

  function login(credentials){
    return Restangular.one('api/v1').post('customers/login',credentials).then((res)=>{
        token=res.id;
        loggedIn=true;
        });
  }

  function logout (){
      return Restangular.one('api/v1').post('customers/logout',{access_token:token}).then((res)=>{
        token=null;
        loggedIn=false;
        });
  }
  function isLoggedIn(){
      return loggedIn;
  }


};


