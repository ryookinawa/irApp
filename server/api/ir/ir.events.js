/**
 * Ir model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ir = require('./ir.model');
var IrEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
IrEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ir.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    IrEvents.emit(event + ':' + doc._id, doc);
    IrEvents.emit(event, doc);
  }
}

export default IrEvents;
