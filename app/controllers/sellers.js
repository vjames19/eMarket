'use strict';

var _ = require('underscore');

var sellers = {
  1: {
    sellerId: 1,
    sellerUserName: 'pepe',
    sellerRating: '***'
  },
  2: {
    sellerId: 2,
    sellerUserName: 'loco',
    sellerRating: '**'
  },
  3: {
    sellerId: 3,
    sellerUserName: 'valle',
    sellerRating: '*****'
  }
};

exports.findSellerById = function(req, res, next, id) {
  //  console.log('id', id);
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

exports.createSeller = function(req, res) {
  var seller = req.body;
  seller.sellerId = _.keys(sellers).length + 1;
  sellers[seller.sellerId] = seller;
  res.jsonp(seller);
};

exports.readSeller = function(req, res) {
  res.jsonp(req.seller);
};

exports.updateSeller = function(req, res) {
  _.extend(req.seller, req.body);
  sellers[req.seller.sellerId] = req.seller;
  res.jsonp(req.seller);
};

exports.deleteSeller = function(req, res) {
  delete sellers[req.seller.sellerId];
  res.jsonp(req.seller);
};

var ratings = {
  1: {
    ratingId: 1,
    raterId: 1,
    rating: '***'
  },
  2: {
    ratingId: 2,
    raterId: 9,
    rating: '**'
  },
  3: {
    ratingId: 3,
    raterId: 15,
    rating: '****'
  }
};

exports.findRatingById = function(req, res, next, id) {
  if(!ratings[+id]) {
    res.jsonp(404, {message: 'Rating Item Not Found'});
  } else {
    req.rating = ratings[+id];
    next();
  }
};

exports.readAllRatings = function(req, res) {
  res.jsonp(_.values(ratings));
};

exports.readRating = function(req, res) {
  res.jsonp(req.rating);
};
