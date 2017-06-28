import '../lib/AuthService';


let _authService = new WeakMap();
let _init = new WeakMap();
let _restangular = new WeakMap();
let _users = new WeakMap();
let _roles = new WeakMap();

class AdminService {

    constructor(Restangular,authService){
        _authService.set(this,authService);
        _init.set(this,false);
        _restangular.set(this,Restangular);
        _users.set(this,[]);
        _roles.set(this,[]);
    }
    
    init() {
        return new Promise.all([this.getRoles(),this.getUsers()]).then(()=>_init.set(this,true));
    }

    isInited(){
        return _init.get(this);
    }

    get users(){
        return _users.get(this);
    }

    get roles(){
        return _roles.get(this);
    }

    getRoles(){
        return _restangular.get(this).all('api/v1/customers/with-roles' ).getList().then((res)=>{
            return _users.set(this,res);
        });
    }

    getUsers(){
        return _restangular.get(this).all('api/v1/roles' ).getList().then((res)=>{
            
            return _roles.set(this,res);
        });
    }

    assignRole(role,user){
        console.log(role,user);
        return _restangular.get(this).all('api/v1/customers/',).customPOST(
            {roleId:role.id,userId:user.id},
             "add-role", {access_token:_authService.get(this).token}, {'Authorization':_authService.get(this).token}
            );
    }

}

AdminService.$inject = ['Restangular', 'AuthService'];

angular.module('app').service('AdminService',AdminService);

