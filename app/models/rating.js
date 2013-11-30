'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'rating_id': 'id',
  'user_login_user_name': 'raterName',
  'rating_value': 'rating',
  'rating_avg': 'avgRating'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT rating_id, user_login_user_name, rating_value ' +
          'FROM rating_history INNER JOIN user_login_info ' +
          'ON (rating_rater_user_id = user_login_info.user_login_id) ' +
          'WHERE rating_rated_user_id = ? ' +
          'ORDER BY user_login_user_name';
      connection.query(sql, [userId], function(err, ratings) {
        callback(err, mapper.mapCollection(ratings, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, ratingId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT rating_id, user_login_user_name, rating_value ' +
          'FROM rating_history INNER JOIN user_login_info ' +
          'ON (rating_rater_user_id = user_login_info.user_login_id) ' +
          'WHERE rating_rated_user_id = ? AND rating_id = ? ' +
          'ORDER BY user_login_user_name';
      connection.query(sql, [userId, ratingId], function(err, rating) {
        callback(err, mapper.map(rating[0], DICTIONARY));
      });
    }
  });
};

module.exports.getAvgRating = function(userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT rating_rated_user_id, AVG(rating_value) AS rating_avg ' +
          'FROM rating_history ' +
          'WHERE rating_rated_user_id = ? ' +
          'GROUP BY rating_rated_user_id';
      connection.query(sql, [userId], function(err, rating) {
        callback(err, mapper.map(rating[0], DICTIONARY));
      });
    }
  });
};
