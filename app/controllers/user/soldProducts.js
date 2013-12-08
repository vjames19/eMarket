'use strict';

var _ = require('underscore');
var SoldProducts = require('../../models/soldProduct.js');

exports.findSoldProductById = function(req, res, next, id) {
  SoldProducts.get(req.params.userId, id, function(err, soldProduct) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(soldProduct)) {
      next({code: 404, message: 'Sold Product with id ' + id + ' not found.'});
    } else {
      req.soldProduct = soldProduct;
      next();
    }
  });
};

exports.readAllSoldProducts = function(req, res, next) {
  SoldProducts.getAll(req.params.userId, function(err, soldProducts) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(soldProducts)) {
      next({code: 404, message: 'Sold Products not found.'});
    } else {
      res.jsonp(200, soldProducts);
    }
  });
};

exports.readSoldProduct = function(req, res, next) {
  if(!req.soldProduct) {
    next({code: 404, message: 'Sold Product not found.'});
  } else {
    res.jsonp(200, req.soldProduct);
  }
};

exports.createSoldProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updateSoldProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteSoldProduct = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
