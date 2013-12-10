'use strict';

var _ = require('underscore');
var Carousels = require('../models/carousel.js');

exports.findCarouselById = function(req, res, next, id) {
  Carousels.get(req.params.userId, id, function(err, carousel) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(carousel)) {
      next({code: 404, message: 'Carousel with id ' + id + ' not found.'});
    } else {
      req.carousel = carousel;
      next();
    }
  });
};

exports.readAllCarousels = function(req, res, next) {
  Carousels.getAll(req.query.userId, function(err, carousels) {
    if(err) {
      next({code: 500, message: err});
    } else if(_.isEmpty(carousels)) {
      next({code: 404, message: 'Carousels not found.'});
    } else {
      res.jsonp(200, carousels);
    }
  });
};

exports.readCarousel = function(req, res, next) {
  if(!req.carousel) {
    next({code: 404, message: 'Carousel not found.'});
  } else {
    res.jsonp(200, req.carousel);
  }
};
