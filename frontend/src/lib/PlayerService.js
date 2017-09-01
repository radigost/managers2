/**
 * Created by user on 05.01.17.
 */

import './RestService';

const __ = new WeakMap();

class Player {
    constructor(RestService, $timeout) {
        __.set(this, {
            inited: false,
            id: undefined,
            type: 'player',
            name: "",
            fakeName: "Иван 2Иванович",
            company: "",
            money: 0,
            position: "",
            players: [],
            $timeout: $timeout
        });

        Object.assign(this, {
            RestService: RestService
        });
    }

    init(id) {
        // TODO why do i need this local storage anymore?
        // __.get(this).id = localStorage.getItem("playerId");
        __.get(this).id = id;
        return new Promise((resolve, reject) => {
            if (!__.get(this).inited) {
                this.RestService.get('persons/' + __.get(this).id).then((res) => {
                    __.set(this, res);
                    __.get(this).inited = true;
                    resolve();
                });
            }
            resolve();
        });
    }

    get type() {
        return __.get(this).type;
    }

    get id() {
        return __.get(this).id;
    }

    get name() {
        return __.get(this).name;
    }

    get fakeName() {
        return __.get(this).fakeName;
    }

    get company() {
        return __.get(this).company;
    }

    get money() {
        return __.get(this).money;
    }

    get position() {
        return __.get(this).company;
    }

    get image_path() {
        return __.get(this).image_path;
    }

    get players() {
        return __.get(this).players;
    }


    choosePlayer(playerAvatarID) {
        if (this.playerAvatarID) {
            return this.playerAvatarID = playerAvatarID;
        }
    }

    getPlayers() {
        return this.RestService.get('persons').then((res) => {
            __.get(this).players = res;
        });
    }


}

Player.$inject = ['RestService', '$timeout'];
angular.module('app').service('Player', Player);
