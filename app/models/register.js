'use strict';

var _ = require('underscore');
//var mapper = require('../mapper');

var WHITELIST = [
  'firstName', 'middleName', 'lastName', 'telephone', 'email', 'username', 'password',
  'mailingAddress', 'mailingCountry', 'mailingGeographicalRegion', 'mailingCity', 'mailingZipCode',
  'sameAsMailing',
  'billingAddress', 'billingCountry', 'billingGeographicalRegion', 'billingCity', 'billingZipCode',
  'cardName', 'cardType', 'cardNumber', 'cardExpirationDate', 'cardSecurityCode',
  'securityQuestion1', 'securityQuestion2', 'securityQuestion3',
  'securityAnswer1', 'securityAnswer2', 'securityAnswer3'];

var executor = null;

module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.create = function(register, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      register = _.pick(register, WHITELIST);
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        }
        else {
          var sql0 = 'SELECT * FROM active_users WHERE user_login_user_name = LCASE(?) OR user_login_email = LCASE(?)';
          var params0 = [register.username, register.email];
          connection.query(sql0, params0, function(err, result) {
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
                              [register.mailingAddress, register.mailingCountry, register.mailingGeographicalRegion,
                                register.mailingCity, register.mailingZipCode]
                            ];
                          }
                          else {
                            params4 = [
                              [register.mailingAddress, register.mailingCountry, register.mailingGeographicalRegion,
                                register.mailingCity, register.mailingZipCode],
                              [register.billingAddress, register.billingCountry, register.billingGeographicalRegion,
                                register.billingCity, register.billingZipCode]
                            ];
                          }

                          connection.query(sql4, [params4], function(err, fourthResult) {
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
                                        register.cardExpirationDate, register.cardNumber, register.cardSecurityCode];
                                      connection.query(sql7, params7, function(err) {
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
