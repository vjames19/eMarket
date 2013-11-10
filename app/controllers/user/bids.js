'use strict';

var _ = require('underscore');
var Bids = require('../../models/bid.js');

var bids = {
  1: {
    bidId: 1,
    userId: 1,
    productId: 1,
    productName: 'harry potter',
    bidAmount: 89.00,
    bidTime: '07/19/2013:19:20:35 EST'
  },
  2: {
    bidId: 2,
    userId: 2,
    productId: 2,
    productName: 'alienware',
    bidAmount: 800.99,
    bidTime: '07/10/2013:14:13:42 EST'
  }
};

exports.findUserBidById = function(req, res, next, id) {
  Bids.get(req.params.userId, id, function(err, bid) {
    if(_.isEmpty(bid)) {
      res.jsonp(404, {message: 'Shopping Cart with id ' + id + ' not found'});
    }
    else {
      req.bid = bid;
      next();
    }
  });
};

exports.readAllUserBids = function(req, res) {
  Bids.getAll(req.params.userId, function(err, bids) {
    res.jsonp(bids);
  });
};

exports.createUserBid = function(req, res) {
  var bid = req.body;
  bid.bidId = _.keys(bids).length + 1;
  bids[bid.bidId] = bid;
  res.jsonp(bid);
};

exports.readUserBid = function(req, res) {
  res.jsonp(req.bid);
};

exports.updateUserBid = function(req, res) {
  _.extend(req.bid, req.body);
  bids[req.bid.bidId] = req.bid;
  res.jsonp(req.bid);
};

exports.deleteUserBid = function(req, res) {
  delete bids[req.bid.bidId];
  res.jsonp(req.bid);
};
