'use strict';

(function() {

class IrController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    $scope.irs = [];

    $http.get('/api/v1/irs').then(response => {
      $scope.irs = response.data;
      socket.syncUpdates('ir', $scope.irs);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }
}

angular.module('irAppApp')
  .controller('IrCtrl', IrController);
})();
