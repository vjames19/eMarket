'use strict';

var _ = require('underscore');
var SubmitPayment = require('../../models/submitPayment.js');

exports.createPayment = function(req, res, next) {
  SubmitPayment.create(req.body, req.params.userId, function(err, payment) {
    if(err) {
      next({code: 500, message: err});
    } else if(payment === null) {
      next({code: 409, message:'Cannot Submit Payment Successfully.'});
    } else {
      res.jsonp(201, payment);
    }
  });

};
