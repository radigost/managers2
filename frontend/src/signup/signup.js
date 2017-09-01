
var template= require('./signup.pug');
import '../lib/RestService';

angular.module('app').component('signup',{
   bindings:{
    $router:'<'
  },
  template:template(),
  controller :  SignUpCtrl,
    }
);


SignUpCtrl.$inject = ['RestService', '$cookies'];

function SignUpCtrl(RestService,cookies){
    this.user = {};
    var _this = this;
    _this.signup = function(credentials){
        console.log(this.user);
        RestService.post('customers',this.user).then((res)=>{
            this.$router.navigate(['Menu',{verify:'true'}]);
        });
    }

};


