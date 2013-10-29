'use strict';

var Product = require('../models/product.js');

exports.searchProduct = function(req, res) {
  if(req.query.q) {
    Product.search(req.query.q, function(err, products) {
      res.jsonp(products);
    });
  } else {
    res.jsonp(400, {message: 'Need a query parameter'});
  }
};
