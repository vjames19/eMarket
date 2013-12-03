'use strict';

var _ = require('underscore');
var PurchaseHistory = require('../../models/purchasehistory.js');

exports.findPurchaseById = function(req, res, next, id) {
  PurchaseHistory.get(req.params.userId, id, function(err, purchase) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(purchase)) {
      res.jsonp(404, {message: 'Purchase with id ' + id + ' not found.'});
    } else {
      req.purchase = purchase;
      next();
    }
  });
};

exports.readAllPurchases = function(req, res) {
  PurchaseHistory.getAll(req.params.userId, function(err, purchases) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(purchases)) {
      res.jsonp(404, {message: 'Purchases not found.'});
    } else {
      res.jsonp(200, purchases);
    }
  });
};

exports.readPurchase = function(req, res) {
  if(!req.purchase) {
    res.jsonp(404, {message: 'Purchase not found.'});
  } else {
    res.jsonp(200, req.purchase);
  }
};

exports.createPurchase = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updatePurchase = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deletePurchase = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
