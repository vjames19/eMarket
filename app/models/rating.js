'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');
var _ = require('underscore');

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
        console.log("rating getAll", this.sql);
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
        console.log("rating get", this.sql);
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
      var newRating = {'rating_rated_user_id': userId, 'rating_avg': 0};
      connection.query(sql, [userId], function(err, rating) {
        console.log("rating getAvgRating", this.sql);
        if(_.isEmpty(rating)) {
          callback(err, mapper.map(newRating, DICTIONARY));
        } else {
          callback(err, mapper.map(rating[0], DICTIONARY));
        }
      });
    }
  });
};

module.exports.createRating = function(rating, callback) {

  executor.execute(function(err, connection) {
    if(err) {
      callback(err)
    } else {
      var sql = 'INSERT INTO rating_history (rating_rated_user_id, rating_rater_user_id, rating_value) ' +
          'VALUES (?,?,?)';
      connection.query(sql, [rating.ratedId, rating.raterId, rating.value], function(err, insertStatus) {
        console.log("rating create", this.sql);

        if(err) {
          callback(err);
        } else {
          callback(err, {id: insertStatus.insertId});
        }
      });
    }
  });
};
