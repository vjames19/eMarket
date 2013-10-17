'use strict';
var _ = require('underscore');

var Category = function(id, categoryName, categoryParent, categories) {
  this.id = id;
  this.categoryId = id;
  this.categoryName = categoryName;
  this.categoryParent = categoryParent;
  this.categories = categories;
};

var executor = null;

module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * from category_info WHERE category_status = true';
    connection.query(sql, function(err, categories) {
      if(err) {
        callback(err);
      } else {
        categories = _.map(categories, function(category) {
          return new Category(category.category_id, category.category_name, category.category_parent_id)
        });
        callback(null, categories);
      }
    });
  });
};
