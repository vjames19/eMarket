'use strict';

var _ = require('underscore');
var PurchaseHistory = require('../../models/purchaseHistory.js');

exports.findPurchaseById = function(req, res, next, id) {
  PurchaseHistory.get(req.params.userId, id, function(err, purchase) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(purchase)) {
      next({code: 404, message: 'Purchase with id ' + id + ' not found.'});
    } else {
      req.purchase = purchase;
      next();
    }
  });
};

exports.readAllPurchases = function(req, res, next) {
  PurchaseHistory.getAll(req.params.userId, function(err, purchases) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(purchases)) {
      next({code: 404, message: 'Purchases not found.'});
    } else {
      res.jsonp(200, purchases);
    }
  });
};

exports.readPurchase = function(req, res, next) {
  if(!req.purchase) {
    next({code: 404, message: 'Purchase not found.'});
  } else {
    res.jsonp(200, req.purchase);
  }
};

exports.createPurchase = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updatePurchase = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deletePurchase = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
