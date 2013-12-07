'use strict';

var _ = require('underscore');
var Ratings = require('../../models/rating.js');

exports.findRatingById = function(req, res, next, id) {
  Ratings.get(req.params.userId, id, function(err, rating) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(rating)) {
      res.jsonp(404, {message: 'Rating with id ' + id + ' not found.'});
    } else {
      req.rating = rating;
      next();
    }
  });
};

exports.readAllRatings = function(req, res) {
  Ratings.getAll(req.params.userId, function(err, ratings) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(ratings)) {
      res.jsonp(404, {message: 'Ratings not found.'});
    } else {
      res.jsonp(200, ratings);
    }
  });
};

exports.readRating = function(req, res) {
  if(!req.rating) {
    res.jsonp(404, {message: 'Rating not found.'});
  } else {
    res.jsonp(200, req.rating);
  }
};

// Average User Rating
exports.readAvgRating = function(req, res) {
  Ratings.getAvgRating(req.params.userId, function(err, avgRating) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(avgRating)) {
      res.jsonp(404, {message: 'Average Rating not found.'});
    } else {
      res.jsonp(200, avgRating);
    }
  });
};

exports.createRating = function(req, res, next) {
  Ratings.createRating(req.body, function(err, insert) {
    if(err) {
      next({message: err, code: 500});
    } else {
      res.jsonp(201, insert);
    }
  });
};
