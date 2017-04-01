



// import * as angular from "angular";
// import {IModalServiceInstance} from "angular-ui-bootstrap";
//
angular
    .module('app').controller('ModalHelpCtrl',ModalHelpCtrl);

ModalHelpCtrl.$inject = ['$uibModalInstance'];
function ModalHelpCtrl($uibModalInstance)
{
  this.cancel=function() { return uibModalInstance.close(); };
};


