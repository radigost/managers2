

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
            this.dialogues = [];
            res.forEach((dialogue)=>this.dialogues.push(dialogue));
            this.inited = true;
            return deferred.resolve(res);
        });
        return deferred.promise;
    }

    getDialogues(){
        return this.dialogues;
    }

    createNewDialogue(name){
        return this.Restangular.all('api/v1/dialogues').post({name:name});
    }

    deleteDialogue(dialogue){
        const del = JSON.parse(dialogue);
        let toDelete = this.dialogues.find((d)=> d.id===del.id);
        return toDelete.remove();

    }
}

DialogueService.$inject = ['Restangular', '$q'];

angular.module('app').service('DialogueService',DialogueService);

