'use strict';

angular.module('irAppApp')
  .controller('IrCtrl', function ($scope, $http) {
    $scope.irs = [];

    $http.get('/api/irs').success(function(irs) {
      $scope.irs = irs;
    });
  });
