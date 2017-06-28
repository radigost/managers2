/**
 * Created by user on 05.01.17.
 */

import './RestService';


// let _inited = new WeakMap();
// let _token = new WeakMap();
// let _loggedIn = new WeakMap();
// let _restangular = new WeakMap();
// const _restService = new WeakMap();

let __ = new WeakMap();
class AuthService {
  constructor(RestService,$timeout) {
    __.set(this,{
      inited:false,
      token:null,
      RestService:RestService,
      $timeout:$timeout,
      loggedIn:false,
      roles:[]
    });

  }

  init() {
    return new Promise((resolve,reject)=>{
      const id = localStorage.getItem("playerId");
      __.get(this).inited = true;
      resolve();
    })
  }

  login(credentials){
    return __.get(this).RestService.post('customers/login',credentials).then((res)=>{
        __.get(this).token = res.id;
        __.get(this).RestService.setHeaders({'Authorization': __.get(this).token});
        __.get(this).loggedIn = true;
        __.get(this).RestService.list('customers/roles',{id:res.userId}).then((res)=>{
          console.log(res);
          __.get(this).users = res;
        });
        
    });
  }

  logout(){
    return __.get(this).RestService.post('customers/logout').then((res)=>{
      __.get(this).$timeout(()=>{
        __.get(this).token = null;
        __.get(this).loggedIn = false;
      })
      });
  }

  get isLoggedIn(){
      return __.get(this).loggedIn;
  }

  get token(){
    return __.get(this).token;
  }

  get canSeeEditor(){
    return true;
  }
}

AuthService.$inject = ['RestService','$timeout'];

angular.module('app')
    .service('AuthService', AuthService);

