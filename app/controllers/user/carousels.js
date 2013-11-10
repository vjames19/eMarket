'use strict';

var _ = require('underscore');
var Carousels = require('../../models/carousel.js');

// Carousel
exports.findCarouselById = function(req, res, next, id) {
  Carousels.get(req.params.userId, id, function(err, carousel) {
    if(_.isEmpty(carousel)) {
      res.jsonp(404, {message: 'Carousel with id ' + id + ' not found'});
    } else {
      req.carousel = carousel;
      next();
    }
  });
};

exports.readAllCarousels = function(req, res) {
  Carousels.getAll(req.params.userId, function(err, carousels) {
    res.jsonp(carousels);
  });
};

exports.readCarousel = function(req, res) {
  res.jsonp(req.carousel);
};
