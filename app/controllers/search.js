'use strict';

//var _ = require('underscore');
var Product = require('../models/product.js');

exports.searchProduct = function(req, res, next) {
  if(req.query.q) {
    Product.search(req.query.q, function(err, products) {
      if(err) {
        next({code: 500, message: err});
      } else {
        res.jsonp(200, products);
      }
    });
  } else if(req.query.c) {
    Product.searchByCategory(req.query.c, function(err, results) {
      if(err) {
        next({code: 500, message: err});
      } else {
        res.jsonp(200, results);
      }
    });
  } else {
    next({code: 400, message: 'Need a query parameter.'});
  }
};
