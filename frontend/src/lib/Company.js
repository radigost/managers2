// import * as angular from "angular";
// import IService = restangular.IService;
// import * as restangular from "restangular";
/**
 * Created by user on 05.01.17.
 */
import './RestService';

let __ = new WeakMap();

class Company{
    constructor(RestService,$timeout){
        Object.assign(this,{
        });
        __.set(this,{
            RestService:RestService,
            current:{},
            items : [],
            $timeout:$timeout
        });
    }

    selectCurrent(id) {
        if (__.get(this).current.id != id) {
            __.get(this).RestService.get('companies/'+id).then((res)=>{
                __.get(this).current = res;
                __.get(this).RestService.get('companies/'+ id+'/npcs/').then((res)=>{
                    const s = [];
                    _.forEach(res,(npc)=>{
                        s.push(npc.id);
                    })
                    __.get(this).current.npc_set = s;
                });
            });
        
        }
    }


    get current(){
        return __.get(this).current;
    }
    get items(){
        return __.get(this).items;
    }

}

Company.$inject = ['RestService','$timeout'];
angular.module('app').service('Company',Company);

