'use strict';

var _ = require('underscore');
var mapper = require('../mapper');
var logger = require('../logger');

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

var REGISTER_WHITELIST = [
  'firstName', 'middleName', 'lastName', 'telephone', 'email', 'username', 'password',
  'mailingAddress', 'mailingCountry', 'mailingGeoRegion', 'mailingCity', 'mailingZipCode',
  'sameAsMailing',
  'billingAddress', 'billingCountry', 'billingGeoRegion', 'billingCity', 'billingZipCode',
  'cardName', 'cardType', 'cardNumber', 'cardExpDate', 'cardSecurityCode',
  'securityQuestion1', 'securityQuestion2', 'securityQuestion3',
  'securityAnswer1', 'securityAnswer2', 'securityAnswer3'];

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
        logger.logQuery('user_getAll:', this.sql);
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
        logger.logQuery('user_get:', this.sql);
        callback(err, mapper.map(users[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(register, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      register = _.pick(register, REGISTER_WHITELIST);
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        }
        else {
          var sql0 = 'SELECT * FROM active_users WHERE user_login_user_name = LCASE(?) OR user_login_email = LCASE(?)';
          var params0 = [register.username, register.email];
          connection.query(sql0, params0, function(err, result) {
            logger.logQuery('user_create:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            }

            // User Already Exists
            else if(result.length !== 0) {

              connection.commit(function(err) {
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                } else {
                  callback(null, null);
                  console.log('User or Email Already Exists!');
                }
              });

            }

            //User or Email doesn't exists
            else {

              var sql1 = 'INSERT INTO user_info ' +
                  '(user_first_name, user_middle_name, user_last_name, user_telephone, user_creation_date) ' +
                  'VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)';

              var params1 = [register.firstName, register.middleName, register.lastName, register.telephone];
              connection.query(sql1, params1, function(err, firstResult) {
                logger.logQuery('user_create:', this.sql);
                if(err) {
                  connection.rollback(function() {
                    callback(err);
                  });
                }
                else {

                  var userId = firstResult.insertId;

                  var sql2 = 'INSERT INTO user_account_status ' +
                      '(user_account_id, user_account_status) VALUES (?, TRUE)';

                  connection.query(sql2, [userId], function(err) {
                    logger.logQuery('user_create:', this.sql);
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    }
                    else {
                      var sql3 = 'INSERT INTO user_login_info ' +
                          '(user_login_id, user_login_user_name, user_login_password, user_login_email) ' +
                          'VALUES (?, LCASE(?), SHA1(?), LCASE(?))';

                      var params3 = [userId, register.username, register.password, register.email];
                      connection.query(sql3, params3, function(err) {
                        logger.logQuery('user_create:', this.sql);
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        }
                        else {
                          var sql4 = 'INSERT INTO address_history ' +
                              '(address_address, address_country, address_city, ' +
                              'address_geographical_region, address_zipcode) ' +
                              'VALUES ?';

                          var params4;
                          if(register.sameAsMailing === true) {
                            params4 = [
                              [register.mailingAddress, register.mailingCountry, register.mailingGeoRegion,
                                register.mailingCity, register.mailingZipCode]
                            ];
                          }
                          else {
                            params4 = [
                              [register.mailingAddress, register.mailingCountry, register.mailingGeoRegion,
                                register.mailingCity, register.mailingZipCode],
                              [register.billingAddress, register.billingCountry, register.billingGeoRegion,
                                register.billingCity, register.billingZipCode]
                            ];
                          }

                          connection.query(sql4, [params4], function(err, fourthResult) {
                            logger.logQuery('user_create:', this.sql);
                            if(err) {
                              connection.rollback(function() {
                                callback(err);
                              });
                            }
                            else {
                              var mailAddressId;
                              var billAddressId;
                              if(register.sameAsMailing === true) {
                                // .insertId seems to be the first inserted.
                                mailAddressId = fourthResult.insertId;
                                billAddressId = fourthResult.insertId;
                              } else {
                                mailAddressId = fourthResult.insertId;
                                billAddressId = fourthResult.insertId + 1;
                              }

                              var sql5 = 'INSERT INTO mailing_info ' +
                                  '(mailing_user_id, mailing_address_id, mailing_recipient_name, mailing_telephone, ' +
                                  'mailing_is_primary, mailing_status) ' +
                                  'VALUES (?, ?, ?, ?, TRUE, TRUE)';

                              var recipient;
                              if(register.middleName === null) {
                                recipient = register.firstName + ' ' + register.lastName;
                              } else {
                                recipient = register.firstName + ' ' + register.middleName + ' ' + register.lastName;
                              }

                              var params5 = [userId, mailAddressId, recipient, register.telephone];
                              connection.query(sql5, params5, function(err) {
                                logger.logQuery('user_create:', this.sql);
                                if(err) {
                                  connection.rollback(function() {
                                    callback(err);
                                  });
                                }
                                else {
                                  var sql6 = 'INSERT INTO billing_info ' +
                                      '(billing_user_id, billing_address_id, billing_recipient_name, ' +
                                      'billing_telephone, billing_status) ' +
                                      'VALUES (?, ?, ?, ?, TRUE)';

                                  var params6 = [userId, billAddressId, recipient, register.telephone];
                                  connection.query(sql6, params6, function(err, sixthResult) {
                                    logger.logQuery('user_create:', this.sql);
                                    if(err) {
                                      connection.rollback(function() {
                                        callback(err);
                                      });
                                    }
                                    else {
                                      var billId = sixthResult.insertId;

                                      var sql7 = 'INSERT INTO credit_card_info ' +
                                          '(credit_card_user_id, credit_card_billing_address_id, credit_card_type, ' +
                                          'credit_card_owner_name, credit_card_expiration_date, credit_card_number, ' +
                                          'credit_card_csv, credit_card_status) ' +
                                          'VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)';

                                      var params7 = [userId, billId, register.cardType, register.cardName,
                                        register.cardExpDate, register.cardNumber, register.cardSecurityCode];
                                      connection.query(sql7, params7, function(err) {
                                        logger.logQuery('user_create:', this.sql);
                                        if(err) {
                                          connection.rollback(function() {
                                            callback(err);
                                          });
                                        }
                                        else {
                                          var sql8 = 'INSERT INTO question_answer_history ' +
                                              '(answer_question_id, answer_user_id, answer_content, answer_status) ' +
                                              'VALUES ?';

                                          var params8 = [
                                            [register.securityQuestion1, userId, register.securityAnswer1, true],
                                            [register.securityQuestion2, userId , register.securityAnswer2, true],
                                            [register.securityQuestion3, userId, register.securityAnswer3, true]
                                          ];
                                          connection.query(sql8, [params8], function(err) {
                                            logger.logQuery('user_create:', this.sql);
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
                                                  callback(null, register);
                                                  console.log('Finished Registration!');
                                                }
                                              });
                                            }
                                          });
                                        }
                                      });
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

module.exports.update = function(user, AdminReq, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      console.log('userInfo', user);
      var sql1, sql2, sql3, sql4, sql5;
      var params1, params2, params3, params4, params5;
      sql1 = 'UPDATE user_info ' +
          'SET user_first_name = ?, user_middle_name = ?, user_last_name = ?, user_telephone = ? ' +
          'WHERE user_id = ?';
      params1 = [user.firstName, user.middleName, user.lastName, user.telephone, user.id];
      if(user.password) {
        sql2 = 'UPDATE user_login_info ' +
            'SET user_login_email = LCASE(?), user_login_password = SHA1(?) ' +
            'WHERE user_login_id = ?';
        params2 = [user.email, user.password, user.id];
      } else {
        sql2 = 'UPDATE user_login_info ' +
            'SET user_login_email = LCASE(?) ' +
            'WHERE user_login_id = ?';
        params2 = [user.email, user.id];
      }
      sql3 = 'SELECT * FROM user_login_info WHERE user_login_password = SHA1(?) AND user_login_id = ?';
      params3 = [user.oldPassword, user.id];
      // TODO <-- maybe in future compare current questions and actually update/insert those needed
      sql4 = 'UPDATE question_answer_history SET answer_status = 0 WHERE answer_user_id = ?';
      sql5 = 'INSERT INTO question_answer_history ' +
          '(answer_question_id, answer_user_id, answer_content, answer_status) ' +
          'VALUES ?';
      params4 = [user.id];
      params5 = [
        [
          [user.question1, user.id, user.questionAnswer1, true],
          [user.question2, user.id , user.questionAnswer2, true],
          [user.question3, user.id, user.questionAnswer3, true]
        ]
      ];

      if(AdminReq) { // Admin Updating User
        connection.beginTransaction(function(err) {
          if(err) {
            callback(err);
          }
          else {
            connection.query(sql1, params1, function(err) {
              logger.logQuery('user_update:', this.sql);
              if(err) {
                connection.rollback(function() {
                  callback(err);
                });
              } else {
                connection.query(sql2, params2, function(err) {
                  logger.logQuery('user_update:', this.sql);
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
                        callback(null, user);
                        console.log('User Updated Successfully.');
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
      else { // User Updating his Profile
        connection.beginTransaction(function(err) {
          if(err) {
            callback(err);
          }
          else {
            connection.query(sql3, params3, function(err, result) {
              logger.logQuery('user_update:', this.sql);
              if(err) {
                connection.rollback(function() {
                  callback(err);
                });
              }
              else {
                if(result.length === 1) { // user matched
                  connection.query(sql1, params1, function(err) {
                    logger.logQuery('user_update:', this.sql);
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else {
                      connection.query(sql2, params2, function(err) {
                        logger.logQuery('user_update:', this.sql);
                        if(err) {
                          connection.rollback(function() {
                            callback(err);
                          });
                        } else {
                          connection.query(sql4, params4, function(err) {
                            logger.logQuery('user_update:', this.sql);
                            if(err) {
                              connection.rollback(function() {
                                callback(err);
                              });
                            } else {
                              connection.query(sql5, params5, function(err) {
                                logger.logQuery('user_update:', this.sql);
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
                                      callback(null, user);
                                      console.log('User Updated Successfully.');
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                }
                else { // user not matched
                  connection.commit(function(err) {
                    if(err) {
                      connection.rollback(function() {
                        callback(err);
                      });
                    } else {
                      callback(null, null);
                      console.log('Old Password is incorrect.');
                    }
                  });
                }
              }
            });
          }
        });
      }

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
        logger.logQuery('user_authenticate:', this.sql);
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
            logger.logQuery('user_changePassword:', this.sql);
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            }
            else {
              // Correct Info
              if(result.length === 3) {

                connection.query(sql2, params2, function(err) {
                  logger.logQuery('user_changePassword:', this.sql);
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
