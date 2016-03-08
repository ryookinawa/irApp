'use strict';

var app = require('../..');
import request from 'supertest';

var newIr;

describe('Ir API:', function() {

  describe('GET /api/irs', function() {
    var irs;

    beforeEach(function(done) {
      request(app)
        .get('/api/irs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          irs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      irs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/irs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/irs')
        .send({
          name: 'New Ir',
          info: 'This is the brand new ir!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIr = res.body;
          done();
        });
    });

    it('should respond with the newly created ir', function() {
      newIr.name.should.equal('New Ir');
      newIr.info.should.equal('This is the brand new ir!!!');
    });

  });

  describe('GET /api/irs/:id', function() {
    var ir;

    beforeEach(function(done) {
      request(app)
        .get('/api/irs/' + newIr._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ir = res.body;
          done();
        });
    });

    afterEach(function() {
      ir = {};
    });

    it('should respond with the requested ir', function() {
      ir.name.should.equal('New Ir');
      ir.info.should.equal('This is the brand new ir!!!');
    });

  });

  describe('PUT /api/irs/:id', function() {
    var updatedIr;

    beforeEach(function(done) {
      request(app)
        .put('/api/irs/' + newIr._id)
        .send({
          name: 'Updated Ir',
          info: 'This is the updated ir!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIr = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIr = {};
    });

    it('should respond with the updated ir', function() {
      updatedIr.name.should.equal('Updated Ir');
      updatedIr.info.should.equal('This is the updated ir!!!');
    });

  });

  describe('DELETE /api/irs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/irs/' + newIr._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when ir does not exist', function(done) {
      request(app)
        .delete('/api/irs/' + newIr._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
