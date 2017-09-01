
let template= require('./signin.pug');

import '../lib/AuthService';

class SignInCtrl{
    constructor(Restangular,cookies,AuthService){
        Object.assign(this,{
            user:{},
            AuthService:AuthService
        });
    }

    signin(){
        this.AuthService.login(this.user).then((res)=>{
          // this.$router.navigate(['Menu']);
        });
    };

    $routerOnActivate(next){
        this.needVerify = next.params.verify;
    }

};

SignInCtrl.$inject = ['Restangular', '$cookies','AuthService'];
angular.module('app')
    .component('signin',{
        bindings:{
            $router:'<'
        },
        template:template(),
        controller :  SignInCtrl,
    });