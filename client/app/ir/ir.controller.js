'use strict';

(function() {

class IrController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/irs').then(response => {
      this.awesomeThings = response.data;
      console.log(response.data);
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }
}

angular.module('irAppApp')
  .controller('IrCtrl', IrController);
})();
