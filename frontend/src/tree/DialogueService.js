

class DialogueService {

    constructor(Restangular,q){
        this.inited = false;
        this.dialogues = [];
        this.q = q;
        this.Restangular=Restangular;
    }
    
    init() {
        let deferred = this.q.defer();
        this.Restangular.all('api/v1/dialogues/').getList().then((res) => {
            res.forEach((dialogue)=>this.dialogues.push(dialogue));
            this.inited = true;
            return deferred.resolve(res);
        });
        return deferred.promise;
    }

    getDialogues(){
        return this.dialogues;
    }
}

DialogueService.$inject = ['Restangular', '$q'];

angular.module('app').service('DialogueService',DialogueService);

