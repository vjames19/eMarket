'use strict';

var _ = require('underscore');

var categories = {
  1: {categoryId: 1, categoryName: 'books', categoryParent: null},
  2: {categoryId: 2, categoryName: 'computers', categoryParent: null},
  3: {categoryId: 3, categoryName: 'fiction', categoryParent: 1}
};

exports.findCategoryById = function(req, res, next, id) {
  var category = categories[+id];
  if(!category) {
    res.jsonp(404, {message: 'Not found'});
  } else {
    req.category = category;
    next();
  }
};

/**
 * Create a category
 */
exports.createCategory = function(req, res) {
  var category = req.body;
  category.categoryId = _.keys(categories).length + 1;
  categories[category.categoryId] = category;
  res.jsonp(category);
};

/**
 * Update a category
 */
exports.updateCategory = function(req, res) {
  var category = req.category;
  category = _.extend(category, req.body);
  categories[category.categoryId] = category;
  res.jsonp(category);
};

/**
 * Delete a category
 */
exports.deleteCategory = function(req, res) {
  delete categories[req.category.categoryId];
  res.jsonp(category);
};

/**
 * Read a category
 */
exports.readCategory = function(req, res) {
  res.jsonp(req.category);
};

/**
 * List of categories.
 */
exports.readAll = function(req, res) {
  res.jsonp(_.values(categories));
};
