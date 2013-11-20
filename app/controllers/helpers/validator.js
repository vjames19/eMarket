'use strict';

var _ = require('underscore');

module.exports.validate = function(reqProperty, model, req, res, next) {
  var objectToValidate = null;
  if(req.hasOwnProperty(reqProperty)) {
    objectToValidate = _.extend({}, req[reqProperty], req.body);
  } else {
    objectToValidate = req.body;
  }

  var errors = model.validate(objectToValidate);
  if(!_.isEmpty(errors)) {
    res.jsonp(422, {
      message: 'Validation Failed.',
      errors: errors
    });
  } else {
    next();
  }
};
