'use strict';

var _ = require('underscore');

module.exports = function(pool) {
  return {
    execute: function(callback) {
      pool.getConnection(function(err, connection) {
        if(err) {
          console.log('Error getting connection from pool', err);
          callback(err);
        } else {
          callback(err, connection);
          connection.release();
        }
      });
    }
  };
}
