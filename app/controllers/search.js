'use strict';

var Product = require('../models/product.js');

exports.searchProduct = function(req, res) {
  if(req.query.q) {
    Product.search(req.query.q, function(err, products) {
      res.jsonp(products);
    });
  } else if(req.query.c) {
    Product.searchByCategory(req.query.c, function(err, results) {
      res.jsonp(results);
    });
  } else {
    res.jsonp(400, {message: 'Need a query parameter.'});
  }
};
