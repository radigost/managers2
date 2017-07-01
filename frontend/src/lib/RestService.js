/**
 * Created by user on 26.06.17.
 */

let __ = new WeakMap();

class RestService {
    constructor(Restangular) {
        __.set(this,{
            Restangular:Restangular,
            inited:false,
            players:[],
        });
    
// Restangular.setDefaultRequestParams('get', {limit: 10});

    }

    init() {
        return new Promise((resolve,reject)=>{
            __.get(this).inited=true;
            __.get(this).Restangular.one('api/v1/my/').get().then( (res)=> {
                 localStorage.setItem("userId",res.user_id);
            });
            __.get(this).Restangular.one('api/v1/persons').get().then( (res)=>{
                __.get(this).players=res;
            });
            resolve();
        })
    }
    get isInited(){
        return __.get(this).inited;
    }
    get players(){
        return __.get(this).players;
    }

    setHeaders(headers){
        __.get(this).Restangular.setDefaultHeaders(headers);
    }

    list(path,params){
        return __.get(this).Restangular.all('api/v1/'+path).getList(params).then((res)=>res);
    }

    get(path,params){
        return __.get(this).Restangular.one('api/v1/'+path).get(params).then((res)=>res);
    }

    post(path,params){
        return __.get(this).Restangular.one('api/v1').post(path,params).then((res)=>res);
    }

    put(path,params={},element){
        return __.get(this).Restangular.one('api/v1').customPUT(element,path,params).then((res)=>res);
    }

    remove(path,params){
        return __.get(this).Restangular.one('api/v1/'+path,params).remove().then((res)=>res);
    }
  
}

RestService.$inject = ['Restangular'];

angular.module('app')
    .service('RestService', RestService);

