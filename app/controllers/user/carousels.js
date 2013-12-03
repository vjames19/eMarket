'use strict';

var _ = require('underscore');
var Carousels = require('../../models/carousel.js');

exports.findCarouselById = function(req, res, next, id) {
  Carousels.get(req.params.userId, id, function(err, carousel) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(carousel)) {
      res.jsonp(404, {message: 'Carousel with id ' + id + ' not found.'});
    } else {
      req.carousel = carousel;
      next();
    }
  });
};

exports.readAllCarousels = function(req, res) {
  Carousels.getAll(req.params.userId, function(err, carousels) {
    if(err) {
      res.jsonp(500, {message: err});
    } else if(_.isEmpty(carousels)) {
      res.jsonp(404, {message: 'Carousels not found.'});
    } else {
      res.jsonp(200, carousels);
    }
  });
};

exports.readCarousel = function(req, res) {
  if(!req.carousel) {
    res.jsonp(404, {message: 'Carousel not found.'});
  } else {
    res.jsonp(200, req.carousel);
  }
};
