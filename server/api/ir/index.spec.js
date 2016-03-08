'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var irCtrlStub = {
  index: 'irCtrl.index',
  show: 'irCtrl.show',
  create: 'irCtrl.create',
  update: 'irCtrl.update',
  destroy: 'irCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var irIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './ir.controller': irCtrlStub
});

describe('Ir API Router:', function() {

  it('should return an express router instance', function() {
    irIndex.should.equal(routerStub);
  });

  describe('GET /api/irs', function() {

    it('should route to ir.controller.index', function() {
      routerStub.get
        .withArgs('/', 'irCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/irs/:id', function() {

    it('should route to ir.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'irCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/irs', function() {

    it('should route to ir.controller.create', function() {
      routerStub.post
        .withArgs('/', 'irCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/irs/:id', function() {

    it('should route to ir.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'irCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/irs/:id', function() {

    it('should route to ir.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'irCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/irs/:id', function() {

    it('should route to ir.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'irCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
