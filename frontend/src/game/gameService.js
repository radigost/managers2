
/**
 * Created by user on 05.01.17.
 */
import '../lib/PlayerService';
import '../lib/RestService';
let __ = new WeakMap();
class GameService{
    constructor (RestService,player) {
        Object.assign(this,{
        });

        __.set(this,{
            companies:[],
            RestService:RestService,
            isInit :false,
            player:player,
        });
    }

    init() {
        __.get(this).player.init();
        __.get(this).RestService.get('companies/').then((res)=> {
            __.get(this).companies = res;
            __.get(this).isInited = true;
        });
    }
    get inited(){
        return __.get(this).isInit;
    }
    get companies(){
        return __.get(this).companies;
    }
    get player (){
        return __.get(this).player;
    }
}

GameService.$inject = ['RestService', 'Player'];
angular.module('app').service('gameService', GameService);




