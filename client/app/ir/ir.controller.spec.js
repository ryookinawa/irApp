'use strict';

describe('Controller: IrCtrl', function () {

  // load the controller's module
  beforeEach(module('irAppApp'));

  var IrCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IrCtrl = $controller('IrCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
