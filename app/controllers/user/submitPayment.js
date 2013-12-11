'use strict';

var SubmitPayment = require('../../models/submitPayment.js');

exports.createPayment = function(req, res, next) {
  SubmitPayment.create(req.body, req.params.userId, function(err, paymentInfo) {
    if(err) {
      next({code: 500, message: err});
    } else if(paymentInfo === null) {
      next({code: 409, message: 'Cannot Submit Payment Successfully.'});
    } else {
      res.jsonp(201, paymentInfo);
    }
  });
};
