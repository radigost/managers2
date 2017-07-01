import '../lib/AuthService';
import '../lib/RestService';


let __ = new WeakMap();

class AdminService {

    constructor(RestService,$timeout){
        __.set(this,{
            RestService:RestService,
            $timeout:$timeout,
            roles:[],
            users:[],
            init:false
        });
    }
    
    init() {
        return new Promise.all([this.getRoles(),this.getUsers()]).then(()=>__.get(this).init=true);
    }

    isInited(){
        return __.get(this).init;
    }

    get users(){
        return __.get(this).users;
    }

    get roles(){
        return __.get(this).roles;
    }

    getRoles(){
        return __.get(this).RestService.list('customers/with-roles' ).then((res)=>{
            return __.get(this).$timeout(()=> __.get(this).users=res);
        });
    }

    getUsers(){
        return __.get(this).RestService.list('roles').then((res)=>{
            return __.get(this).$timeout(()=>__.get(this).roles = res);
        });
    }

    assignRole(role,user){
        return __.get(this).RestService.post('customers/add-role',{roleId:role.id,userId:user.id});
    }

}

AdminService.$inject = ['RestService','$timeout'];

angular.module('app').service('AdminService',AdminService);

