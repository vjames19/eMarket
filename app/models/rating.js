'use strict';

var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

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
          'FROM user_ratings INNER JOIN user_login_info ' +
          'ON (rating_rater_user_id = user_login_info.user_login_id) ' +
          'WHERE rating_rated_user_id = ? ' +
          'ORDER BY user_login_user_name';
      connection.query(sql, [userId], function(err, ratings) {
        logger.logQuery('rating_getAll:', this.sql);
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
          'FROM user_ratings INNER JOIN user_login_info ' +
          'ON (rating_rater_user_id = user_login_info.user_login_id) ' +
          'WHERE rating_rated_user_id = ? AND rating_id = ? ' +
          'ORDER BY user_login_user_name';
      connection.query(sql, [userId, ratingId], function(err, rating) {
        logger.logQuery('rating_get:', this.sql);
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
          'FROM user_ratings ' +
          'WHERE rating_rated_user_id = ? ' +
          'GROUP BY rating_rated_user_id';
      var newRating = {'rating_rated_user_id': userId, 'rating_avg': 0};
      connection.query(sql, [userId], function(err, rating) {
        logger.logQuery('rating_getAvgRating:', this.sql);
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
      callback(err);
    } else {
      var sql1 = 'SELECT rating_id FROM user_ratings ' +
          'WHERE rating_rated_user_id=? AND rating_rater_user_id = ?';
      var updateRatingSql = 'UPDATE user_ratings ' +
          'SET rating_value = ? ' +
          'WHERE rating_id = ?';
      var insertRatingSql = 'INSERT INTO user_ratings ' +
          '(rating_rated_user_id, rating_rater_user_id, rating_value) ' +
          'VALUES (?,?,?)';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          connection.query(sql1, [rating.ratedId, rating.raterId], function(err, ratings) {
            logger.logQuery('rating_create:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              if(!_.isEmpty(ratings)) {
                var mappedRatings = mapper.map(ratings[0], DICTIONARY);
                var updateRatingParams = [rating.value, mappedRatings.id];
                connection.query(updateRatingSql, updateRatingParams, function(err, updatedRating) {
                  logger.logQuery('rating_create:', this.sql);
                  if(err) {
                    connection.rollback(function() {
                      callback(err);
                    });
                  } else {
                    connection.commit(function(err) {
                      if(err) {
                        connection.rollback(function() {
                          callback(err);
                        });
                      } else {
                        console.log('Updated Rating Successfully', arguments);
                        callback(null, updatedRating);
                      }
                    });
                  }
                });
              }
              else {
                var insertRatingParams = [rating.ratedId, rating.raterId, rating.value];
                connection.query(insertRatingSql, insertRatingParams, function(err, insertStatus) {
                  logger.logQuery('rating_create:', this.sql);
                  if(err) {
                    connection.rollback(function() {
                      callback(err);
                    });
                  } else {
                    connection.commit(function(err) {
                      if(err) {
                        connection.rollback(function() {
                          callback(err);
                        });
                      } else {
                        console.log('Created Rating Successfully', arguments);
                        callback(null, {id: insertStatus.insertId});
                      }
                    });
                  }
                });
              }
            }
          });
        }
      });
    }
  });
};

module.exports.ratingGivenToSellerByUser = function(sellerId, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT rating_value ' +
          'FROM user_ratings ' +
          'WHERE rating_rated_user_id = ? AND rating_rater_user_id= ? ';
      connection.query(sql, [sellerId, userId], function(err, rating) {
        logger.logQuery('rating_ratingGivenToSellerByUser:', this.sql);
        if(err) {
          callback(err);
        } else {
          if(_.isEmpty(rating[0])) {
            callback(null, {rating: 0});
          } else {
            callback(null, mapper.map(rating[0], DICTIONARY));
          }
        }
      });
    }
  });
};
