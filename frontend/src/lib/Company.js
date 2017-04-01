// import * as angular from "angular";
// import IService = restangular.IService;
// import * as restangular from "restangular";
/**
 * Created by user on 05.01.17.
 */

angular.module('app').service('Company', ['Restangular', Company]);

function Company(Restangular){
  // public current: {};
  // public items: Array<any>;
    var current = {},
    items = [];
    var service={
        current:current,
        items:items,

        selectCurrent:selectCurrent
    };
    return service;

    function selectCurrent(id) {
        Restangular.one('api/v1/companies/', id).get().then((res)=>service.current = res);
        Restangular.one('api/v1/companies/', id,'/npcs/').get().then((res)=>{
            var s = [];
            _.forEach(res,(npc)=>{
                s.push(npc.id);
            })
            service.current.npc_set = s;
        });
    }


};




