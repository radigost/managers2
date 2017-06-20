import '../lib/AuthService';


let _authService = new WeakMap();
let _init = new WeakMap();
let _restangular = new WeakMap();
let _users = new WeakMap();

class AdminService {

    constructor(Restangular,authService){
        _authService.set(this,authService);
        _init.set(this,false);
        _restangular.set(this,Restangular);
        _users.set(this,[]);
    }
    
    init() {
        return _restangular.get(this).all('api/v1/customers/with-roles' ).getList().then((res)=>{
            _init.set(this,true);
            return _users.set(this,res);
        });
    }

    isInited(){
        return _init.get(this);
    }

    get users(){
        return _users.get(this);
    }

}

AdminService.$inject = ['Restangular', 'AuthService'];

angular.module('app').service('AdminService',AdminService);

