'use strict';

var Product = require('../models/product.js');

exports.searchProduct = function(req, res, next) {
  if(req.query.q) {
    Product.search(req.query.q, function(err, products) {
      res.jsonp(200, products);
    });
  } else if(req.query.c) {
    Product.searchByCategory(req.query.c, function(err, results) {
      res.jsonp(200, results);
    });
  } else {
    next({code: 400, message: 'Need a query parameter.'});
  }
};
