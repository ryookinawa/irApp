'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var IrSchema = new mongoose.Schema({
  floor: String, // 階を格納
  place: String, // 部屋を格納
  button: String, // 機器のボタンを格納
  code: String, // 信号を格納
  group: String, // グループ情報を格納
});

export default mongoose.model('Ir', IrSchema);
