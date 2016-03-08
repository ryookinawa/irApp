/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/irs              ->  index
 * POST    /api/irs              ->  create
 * GET     /api/irs/:id          ->  show
 * PUT     /api/irs/:id          ->  update
 * DELETE  /api/irs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Ir from './ir.model';

Ir.find({}).remove(function() {
  Ir.create({
    name: '田中_2'
  }, {
    name: '鈴木_2'
  }, function(err) {
    console.log('finished populating Members');
  });
});

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Irs
export function index(req, res) {
  Ir.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Ir from the DB
export function show(req, res) {
  Ir.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Ir in the DB
export function create(req, res) {
  Ir.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Ir in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Ir.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Ir from the DB
export function destroy(req, res) {
  Ir.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
