'use strict';

var _ = require('underscore');
var Bids = require('../../models/bid.js');

exports.findUserBidById = function(req, res, next, id) {
  Bids.get(req.params.userId, id, function(err, bid) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(bid)) {
      next({code: 404, message: 'Bid with id ' + id + ' not found.'});
    } else {
      req.bid = bid;
      next();
    }
  });
};

exports.readAllUserBids = function(req, res, next) {
  Bids.getAll(req.params.userId, function(err, bids) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(bids)) {
      next({code: 404, message: 'Bids not found.'});
    } else {
      res.jsonp(200, bids);
    }
  });
};

exports.readUserBid = function(req, res, next) {
  if(!req.bid) {
    next({code: 404, message: 'Bid not found.'});
  } else {
    res.jsonp(200, req.bid);
  }
};

exports.createUserBid = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.updateUserBid = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};

exports.deleteUserBid = function(req, res, next) {
  next({code: 501, message: 'Not Implemented'});
};
