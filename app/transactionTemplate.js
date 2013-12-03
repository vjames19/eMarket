'use strict';

// TEMPLATE PURPOSES ONLY

var connection = null;
var callback = null;

var sql1 = '', sql2 = '';
var params1 = [''], params2 = [''];
connection.beginTransaction(function(err) {
  if(err) {
    callback(err);
  } else {
    connection.query(sql1, params1, function(err) {
      if(err) {
        connection.rollback(function() {
          callback(err);
        });
      } else {
        connection.query(sql2, params2, function(err) {
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
                callback(null, null);
                console.log('? Created/Updated/Removed Successfully.');
              }
            });
          }
        });
      }
    });
  }
});
