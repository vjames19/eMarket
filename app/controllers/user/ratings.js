'use strict';

var _ = require('underscore');
var Ratings = require('../../models/rating.js');

exports.findRatingById = function(req, res, next, id) {
  Ratings.get(req.params.userId, id, function(err, rating) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(rating)) {
      next({code: 404, message: 'Rating with id ' + id + ' not found.'});
    } else {
      req.rating = rating;
      next();
    }
  });
};

exports.readAllRatings = function(req, res, next) {
  Ratings.getAll(req.params.userId, function(err, ratings) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(ratings)) {
      next({code: 404, message: 'Ratings not found.'});
    } else {
      res.jsonp(200, ratings);
    }
  });
};

exports.readRating = function(req, res, next) {
  if(!req.rating) {
    next({code: 404, message: 'Rating not found.'});
  } else {
    res.jsonp(200, req.rating);
  }
};

// Average User Rating
exports.readAvgRating = function(req, res, next) {
  Ratings.getAvgRating(req.params.userId, function(err, avgRating) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(avgRating)) {
      next({code: 404, message: 'Average Rating not found.'});
    } else {
      res.jsonp(200, avgRating);
    }
  });
};

exports.createRating = function(req, res, next) {
  Ratings.createRating(req.body, function(err, insert) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(201, insert);
    }
  });
};

exports.readRatingGivenToSeller = function(req, res, next) {
  Ratings.ratingGivenToSellerByUser(req.params.userId, req.query.userId, function(err, rating) {
    if(err) {
      next({code: 500, message: err});
    } else {
      res.jsonp(200, rating);
    }
  });
};
