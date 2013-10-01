'use strict';

var _ = require('underscore');

var sellers = {
  1: {
    sellerID: 1,
    sellerUserName: 'pepe',
    sellerRating: '***'
  },
  2: {
    sellerID: 2,
    sellerUserName: 'loco',
    sellerRating: '**'
  },
  3: {
    sellerID: 3,
    sellerUserName: 'valle',
    sellerRating: '*****'
  }
};

exports.findSellerByID = function(req, res, next, id) {
  console.log('id', id);
  if(!sellers[+id]) {
    res.jsonp(404, {message: 'Seller not found'});
  } else {
    req.seller = sellers[+id];
    next();
  }
};

exports.readAllSellers = function(req, res) {
  res.jsonp(_.values(sellers));
};

exports.createSeller = function(req, res)  {
  var seller = req.body;
  seller.sellerID = _.keys(sellers).length + 1;
  sellers[seller.sellerID] = seller;
  res.jsonp(seller);
};

exports.readSeller = function(req, res) {
  res.jsonp(req.seller);
};

exports.updateSeller = function(req, res) {
  _.extend(req.seller, req.body);
  sellers[req.seller.sellerID] = req.seller;
  res.jsonp(req.seller);
};

exports.deleteSeller = function(req, res) {
  delete sellers[req.seller.sellerID];
  res.jsonp(req.seller);
};
