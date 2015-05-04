'use strict';

var User = require('../models/user');

exports.register = function(server, options, next){

  var authenticate = {
    key: process.env.FIREBASE_SECRET,
    expiration: process.env.FIREBASE_EXPIRE,
    validateFunc: function(jwt, cb){
      var now = Date.now();
      var old = jwt.iat * 1000;
      var future = old + (3600 * this.expiration);
      if (now > future  && now > old){
        User.findOne({uid: jwt.d.uid}, function(err,user){
          cb(null,true,{uid: jwt.d.uid, _id: user ? user._id : null});
        });
      }
      else {cb();}
    }
  };
  server.expose({authenticate: authenticate});
  return next();
};

exports.register.attributes = {
  name: 'authentication'
};
