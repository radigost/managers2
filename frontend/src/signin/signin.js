
var template= require('./signin.jade');

require('../lib/AuthService');


angular.module('app').component('signin',{
   bindings:{
    $router:'<'
  },
  template:template(),
  controller :  SignInCtrl,
    }
);


SignInCtrl.$inject = ['Restangular', '$cookies','AuthService'];

function SignInCtrl(Restangular,cookies,AuthService){
    this.user = {};
    var _this = this;
    _this.signin = function(){
        console.log(this.user);
        AuthService.login(this.user).then((res)=>{
          console.log("login successfull");
          _this.$router.navigate(['Menu']);
        });
        
    };
    this.$routerOnActivate = function(next){
        _this.needVerify = next.params.verify;
        console.log(next.params.verify);
    }


};


