import '../lib/RestService';

class DialogueService {

    constructor(RestService,q){
        this.inited = false;
        this.dialogues = [];
        this.q = q;
        this.RestService=RestService;
    }
    
    init() {
        let deferred = this.q.defer();
        this.RestService.list('dialogues').then((res) => {
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
        return this.RestService.post('dialogues',{name:name});
    }

    deleteDialogue(dialogue){
        const del = JSON.parse(dialogue);
        let toDelete = this.dialogues.find((d)=> d.id===del.id);
        return toDelete.remove();

    }
}

DialogueService.$inject = ['RestService', '$q'];

angular.module('app').service('DialogueService',DialogueService);

