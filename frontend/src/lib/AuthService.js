/**
 * Created by user on 05.01.17.
 */




let _inited = new WeakMap();
let _token = new WeakMap();
let _loggedIn = new WeakMap();
let _restangular = new WeakMap();

class AuthService {
  constructor(Restangular) {
    _inited.set(this,false);
    _token.set(this,null);
    _loggedIn.set(this,false);
    _restangular.set(this,Restangular);

  }

  init() {
    return new Promise((resolve,reject)=>{
      const id = localStorage.getItem("playerId");
      _inited.set(this,true);
      resolve();
    })
  }

  login(credentials){
    return _restangular.get(this).one('api/v1').post('customers/login',credentials).then((res)=>{
        _token.set(this,res.id);
        _loggedIn.set(this,true);
    });
  }

  logout (){
      return _restangular.get(this).one('api/v1').post('customers/logout',{access_token:token}).then((res)=>{
        _token.set(this,null);
        _loggedIn.set(this,false);
      });
  }

  get isLoggedIn(){
      return _loggedIn.get(this);
  }
}

AuthService.$inject = ['Restangular'];

angular.module('app')
    .service('AuthService', AuthService);

