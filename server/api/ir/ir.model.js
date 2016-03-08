'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var IrSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model('Ir', IrSchema);
