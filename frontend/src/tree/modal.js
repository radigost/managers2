// import * as angular from "angular";
// import * as restangular from "restangular";
// import {cookies} from "angular";
// import {IModalServiceInstance} from "angular-ui-bootstrap";
// import * as _ from "lodash";
// import IComponentOptions = angular.IComponentOptions;
/**
 * Created by user on 05.01.17.
 */

var treeModalTpl = require('./modal.jade');


angular.module('app').component('modalComponent', {
    bindings:{
      resolve: '<',
      close: '&',
      dismiss: '&'
  },
  template:treeModalTpl(),
  controller :  TreeModalCtrl,
  controllerAs:'$ctrl'
});
TreeModalCtrl.$inject = ['Restangular', '$cookies'];
function TreeModalCtrl(Restangular,cookies) {
    var vm=this;

  this.$onInit= function(){
    this.node = this.resolve.node;
    this.toAdd = {
      text: ""
    };
  }

  this.cancel = function(){
    return this.dismiss({
      $value: 'cancel'
    });
  }


  this.save= function() {
    Restangular.one('api/v1/nodes/', this.node.id).get().then((res)=> {
        res.choice.push(this.selected.id);
        var s = cookies.getAll();
        return res.customPUT('', '', '', {
          'X-CSRFToken': s.csrftoken
        }).then(()=>{
          this.node.answers.push(this.selected);
        });
    });
  }

  this.deleteNode= function(id) {
    Restangular.one('api/v1/nodes/', this.node.id).get().then(
      (res)=> {
        res.choice = _.pull(res.choice, id);
        var s = cookies.getAll();
        res.customPUT('', '', '', {
          'X-CSRFToken': s.csrftoken
        }).then(()=> {
          return this.node.answers = _.pullAllBy(this.node.answers, [
            {
              'id': id
            }
          ], 'id');
        });

      });

  }

  this.close= function() {
    return this.dismiss({$value: 'cancel' });
  }

  this.create= function(text) {
    var obj, s, type;
    if (this.node.category === 'npc') {
      type = 'player';
    } else {
      type = 'npc';
    }
    console.log(this.toAdd);
    obj = {
      "category": type,
      "text": this.toAdd.text,
      "is_fail": null || this.toAdd.is_fail,
      "is_success": null,
      "is_start": null,
      "type": null || this.toAdd.type,
      "choice": []
    };
    s = cookies.getAll();
    Restangular.one('api/v1/nodes/').get().then((res)=>{
        }
    );
    Restangular.one('api/v1/nodes/').post('', obj, '', {
      'X-CSRFToken': s.csrftoken
    }).then((res)=> {
        this.selected = res;
        this.save();
      });
  }

  this.setFailure= function(){
    this.toAdd.is_fail = true;
    this.toAdd.is_success = null;
    return this.toAdd.type = 'failure';
  }

  this.setSuccess= function(){
    this.toAdd.is_fail = null;
    this.toAdd.is_success = true;
    return this.toAdd.type = 'success';
  }

  this.setDefault = function(){
    this.toAdd.is_fail = null;
    this.toAdd.is_success = null;
    return this.toAdd.type = '';
  }

};



