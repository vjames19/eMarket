'use strict';

var _ = require('underscore');
var SoldProducts = require('../../models/soldProduct.js');

exports.findSoldProductById = function(req, res, next, id) {
  SoldProducts.get(req.params.userId, id, function(err, soldProduct) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(soldProduct)) {
      res.jsonp(404, {message: 'Sold Product with id ' + id + ' not found.'});
    } else {
      req.soldProduct = soldProduct;
      next();
    }
  });
};

exports.readAllSoldProducts = function(req, res) {
  SoldProducts.getAll(req.params.userId, function(err, soldProducts) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(soldProducts)) {
      res.jsonp(404, {message: 'Sold Products not found.'});
    } else {
      res.jsonp(200, soldProducts);
    }
  });
};

exports.readSoldProduct = function(req, res) {
  if(!req.soldProduct) {
    res.jsonp(404, {message: 'Sold Product not found.'});
  } else {
    res.jsonp(200, req.soldProduct);
  }
};

exports.createSoldProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.updateSoldProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};

exports.deleteSoldProduct = function(req, res) {
  res.jsonp(501, {message: 'Not Implemented'});
};
