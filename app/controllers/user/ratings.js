'use strict';

var _ = require('underscore');
var Ratings = require('../../models/rating.js');

exports.findRatingById = function(req, res, next, id) {
  Ratings.get(req.params.userId, id, function(err, rating) {
    if(_.isEmpty(rating)) {
      res.jsonp(404, {message: 'Rating with id ' + id + ' not found'});
    } else {
      req.rating = rating;
      next();
    }
  });
};

exports.readAllRatings = function(req, res) {
  Ratings.getAll(req.params.userId, function(err, ratings) {
    res.jsonp(ratings);
  });
};

exports.readRating = function(req, res) {
  res.jsonp(req.rating);
};

exports.readAvgRating = function(req, res) {
  Ratings.getAvgRating(req.params.userId, function(err, avgRating) {
    res.jsonp(avgRating);
  });
};
