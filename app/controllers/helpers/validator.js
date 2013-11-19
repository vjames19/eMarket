'use strict';

module.exports.validate = function(reqProperty, model, req, res, next) {
  var objectToValidate = null;
  if(req.hasOwnProperty(reqProperty)) {
    objectToValidate = _.extend({}, req[reqProperty], req.body);
  } else {
    objectToValidate = req.body;
  }

  var errors = model.validate(objectToValidate);
  if(errors.length > 0) {
    res.jsonp(422, {
      message: 'Validation Failed.',
      errors: errors
    });
  } else {
    next();
  }
};
