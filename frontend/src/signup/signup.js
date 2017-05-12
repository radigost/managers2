
var template= require('./signup.jade');


angular.module('app').component('signup',{
   bindings:{
    $router:'<'
  },
  template:template(),
  controller :  SignUpCtrl,
    }
);


SignUpCtrl.$inject = ['Restangular', '$cookies'];

function SignUpCtrl(Restangular,cookies){
    this.user = {};
    var _this = this;
    _this.signup = function(credentials){
        console.log(this.user);
        Restangular.one('api/v1').post('customers',this.user).then((res)=>{
          console.log(res);


        });
    }


};


