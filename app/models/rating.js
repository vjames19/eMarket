'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'rating_id': 'id',
  'user_login_user_name': 'raterName',
  'rating_value': 'rating'
};

//var WHITELIST = [];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(userId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT rating_id, user_login_user_name, rating_value ' +
              'FROM rating_history INNER JOIN user_login_info ' +
              'ON (rating_rater_user_id = user_login_info.user_login_id) ' +
              'WHERE rating_rated_user_id = ? ' +
              'ORDER BY user_login_user_name';
    connection.query(sql, [userId], function(err, ratings) {
      if(err) {
        callback(err);
      } else {
        ratings = _.map(ratings, function(rating) {
          return mapper.map(rating, DICTIONARY);
        });
        callback(null, ratings);
      }
    });
  });
};

module.exports.get = function(userId, ratingId, callback) {
  executor.execute(function(err, connection) {
    var sql = 'SELECT rating_id, user_login_user_name, rating_value ' +
              'FROM rating_history INNER JOIN user_login_info ' +
              'ON (rating_rater_user_id = user_login_info.user_login_id) ' +
              'WHERE rating_rated_user_id = ? AND rating_id = ? ' +
              'ORDER BY user_login_user_name';
    connection.query(sql, [userId, ratingId], function(err, rating) {
      callback(err, mapper.map(rating[0], DICTIONARY));
    });
  });
};
