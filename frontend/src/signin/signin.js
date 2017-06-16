
let template= require('./signin.jade');

import '../lib/AuthService';






class SignInCtrl{
    constructor(Restangular,cookies,AuthService){
        Object.assign(this,{
            user:{},
            AuthService:AuthService
        });
        console.log(this);
    }

    signin(){
        console.log(this.user);
        this.AuthService.login(this.user).then((res)=>{
          this.$router.navigate(['Menu']);
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