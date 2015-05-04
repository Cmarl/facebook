'use strict';

var Mongoose = require('mongoose');

var userSchema = Mongoose.Schema({
  uid: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  avatar: {type: String, required: true},
  age: {type: Number, required: true},
  address: {type: String},
  photo: {type: String},
  gender: {type: String, required: true},
  birthday: {type: Date, required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

var User = Mongoose.model('User',userSchema);
module.exports = User;
