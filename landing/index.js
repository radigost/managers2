/**
 * Created by user on 18.04.17.
 */
angular.module('app', ['ngResource'])
  .controller('BasicController', function($http) {
    this.email='';
    var _this = this;

    this.sendEmail = function() {
      console.log(_this.email);
      var data ={
        email:_this.email
      }
      var config = {};
      $http.post('/api/v1/customers', data, config).then(successCallback, errorCallback);


    };
    function successCallback(res) {
      alert("Спасибо! ваша заявка принята, проверьте почту для дальнейших инструкций");
      _this.email='';

    }
    function errorCallback(res) {
      console.log(res);
      res.status == 422 ? alert("Ваш адрес уже есть в базе, мы направили письмо с напоминанием пароля") : '';
    }

  });
