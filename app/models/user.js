'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'user_id': 'id',
  'user_first_name': 'firstName',
  'user_middle_name': 'middleName',
  'user_last_name': 'lastName',
  'user_telephone': 'telephone',
  'user_login_email': 'email',
  'user_creation_date': 'creationDate',
  'user_login_user_name': 'username'
};

var FORGOT_WHITELIST = [
  'username', 'email',
  'question1', 'question2', 'question3',
  'answer1', 'answer2', 'answer3',
  'newPassword'
];

var executor = null;
module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.getAll = function(callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT user_info.*, user_login_email, user_login_user_name ' +
          'FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info ' +
          'ON user_info.user_id = user_account_status.user_account_id AND user_id = user_login_id ' +
          'WHERE user_account_status = 1 ';
      connection.query(sql, function(err, users) {
        callback(err, mapper.mapCollection(users, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(id, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT user_info.*, user_login_email, user_login_user_name ' +
          'FROM user_info INNER JOIN user_account_status INNER JOIN user_login_info ' +
          'ON (user_info.user_id=user_account_status.user_account_id AND user_id=user_login_id) ' +
          'WHERE user_id = ? AND user_account_status=1';
      connection.query(sql, [id], function(err, users) {
        callback(err, mapper.map(users[0], DICTIONARY));
      });
    }
  });
};

module.exports.authenticate = function(username, password, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT user_id, user_login_user_name ' +
          'FROM user_login_info INNER JOIN user_info INNER JOIN user_account_status ' +
          'ON (user_login_id=user_id AND user_id=user_account_id) ' +
          'WHERE user_login_user_name = LCASE(?) AND user_login_password = SHA1(?) AND user_account_status = 1';
      connection.query(sql, [username, password], function(err, users) {
        callback(err, mapper.map(users[0], DICTIONARY));
      });
    }
  });
};

module.exports.changePassword = function(forgotInfo, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {

      forgotInfo = _.pick(forgotInfo, FORGOT_WHITELIST);

      var sql1 = 'SELECT * ' +
          'FROM active_users AS AU INNER JOIN question_answer_history as QAH ' +
          'ON ( AU.user_id = QAH.answer_user_id) ' +
          'WHERE ' +
          'AU.user_login_user_name = LCASE(?) AND ' +
          'AU.user_login_email = LCASE(?) AND ' +
          'QAH.answer_status = 1 AND ' +
          'EXISTS ( ' +
          'SELECT * ' +
          'FROM ' +
          'question_answer_history AS inner1, ' +
          'question_answer_history AS inner2, ' +
          'question_answer_history AS inner3 ' +
          'WHERE ' +
          'inner1.answer_question_id = ? AND ' +
          'inner1.answer_content = ? AND ' +
          'inner2.answer_question_id = ? AND ' +
          'inner2.answer_content = ? AND ' +
          'inner3.answer_question_id = ? AND ' +
          'inner3.answer_content = ?)';
      var params1 = [forgotInfo.username, forgotInfo.email,
        forgotInfo.question1, forgotInfo.answer1,
        forgotInfo.question2, forgotInfo.answer2,
        forgotInfo.question3, forgotInfo.answer3
      ];

      var sql2 = 'UPDATE user_login_info ' +
          'SET user_login_password = SHA1(?) ' +
          'WHERE user_login_user_name = LCASE(?) AND ' +
          'user_login_email = LCASE(?)';
      var params2 = [forgotInfo.newPassword, forgotInfo.username, forgotInfo.email];

      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        }
        else {
          connection.query(sql1, params1, function(err, result) {
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            }
            else {
              // Correct Info
              if(result.length === 3) {

                connection.query(sql2, params2, function(err) {
                  if(err) {
                    connection.rollback(function() {
                      callback(err);
                    });
                  }
                  else {
                    connection.commit(function(err) {
                      if(err) {
                        connection.rollback(function() {
                          callback(err);
                        });
                      } else {
                        callback(null, forgotInfo);
                        console.log('Finished Changing Password');
                      }
                    });
                  }
                });

              }
              // Bad Info
              else {
                callback(null, null);
                console.log('Could not Change Password');
              }
            }
          });
        }
      });

    }
  });
};
