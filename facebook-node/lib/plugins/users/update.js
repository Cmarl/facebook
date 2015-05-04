'use strict';

var Joi = require('joi');
var User = require('../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/profile',
    config: {
      description: 'Update user profile',
      validate: {
        payload: {
          name: Joi.string(),
          email: Joi.string().email().required(),
          avatar: Joi.string().uri().required(),
          age: Joi.number().min(13).max(59).required(),
          address: Joi.string(),
          photo: Joi.string(),
          gender: Joi.string().required(),
          birthday: Joi.date().iso()
        }
      },
      handler: function(request, reply){
        if(request.auth.credentials._id){
          User.findByIdAndUpdate(request.auth.credentials._id, request.payload, saveCallback);
        } else {
          var user = new User(request.payload);
          user.uid = request.auth.credentials.uid;
          user.save(saveCallback);
        }

        function saveCallback(err, user){
          if (err){
            console.log('much errrrrror!! Very Breaked this is!!');
            return reply(JSON.stringify(err)).code(400);
          }else{
            console.log('Much Good, Very Wow!');
            return reply(user);
          }
        }
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'users.update'
};
