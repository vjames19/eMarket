'use strict';
var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'category_id': 'id',
  'category_name': 'categoryName',
  'category_parent_id': 'categoryParent'
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
          return mapper.map(category, DICTIONARY);
        });
        callback(null, categories);
      }
    });
  });
};

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT * FROM category_info WHERE category_status = true AND category_id = ?';
    connection.query(sql, id, function(err, categories) {
      callback(err, mapper.map(categories[0], DICTIONARY));
    });
  });
};
