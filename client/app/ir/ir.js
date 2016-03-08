'use strict';

angular.module('irAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ir', {
        url: '/ir',
        templateUrl: 'app/ir/ir.html',
        controller: 'IrCtrl'
      });
  });
