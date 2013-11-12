'use strict';

var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {};

var WHITELIST = [];

var executor = null;

module.exports.init = function(realExecutor) {
  executor = realExecutor;
  return module.exports;
};

module.exports.create = function(registrationValues, callback) {

  executor.execute(function(err, connection) {

    connection.beginTransaction(function(err) {
      if(err) {
        throw err;
      }

      var sql1 = 'INSERT INTO user_info ' +
          '(user_first_name, user_middle_name, user_last_name, user_telephone, user_creation_date) ' +
          'VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)';

      connection.query(sql1, ['', '', '', ''], function(err, firstResult) {
        if(err) {
          connection.rollback(function() {
            throw err;
          });
        }

        var userId = firstResult.insertId;

        var sql2 = 'INSERT INTO user_account_status ' +
            '(user_account_id, user_account_status) VALUES (?, TRUE)';

        connection.query(sql2, [userId], function(err) {
          if(err) {
            connection.rollback(function() {
              throw err;
            });
          }

          var sql3 = 'INSERT INTO user_login_info ' +
              '(user_login_id, user_login_user_name, user_login_password, user_login_email) ' +
              'VALUES (?, ?, ?, ?)';

          connection.query(sql3, [userId, '', '', ''], function(err) {
            if(err) {
              connection.rollback(function() {
                throw err;
              });
            }

            var sql4 = 'INSERT INTO address_history ' +
                '(address_address, address_country, address_city, address_geographical_region, address_zipcode) ' +
                'VALUES (?, ?, ?, ?, ?)';

            connection.query(sql4, ['', '', '', '', ''], function(err, fourthResult) {
              if(err) {
                connection.rollback(function() {
                  throw err;
                });
              }

              var addressId = fourthResult.insertId;

              var sql5 = 'INSERT INTO mailing_info ' +
                  '(mailing_user_id, mailing_address_id, mailing_recipient_name, mailing_telephone, ' +
                  'mailing_is_primary, mailing_status) ' +
                  'VALUES (?, ?, ?, ?, TRUE, TRUE)';

              connection.query(sql5, [userId, addressId, '', ''], function(err) {
                if(err) {
                  connection.rollback(function() {
                    throw err;
                  });
                }

                var sql6 = 'INSERT INTO billing_info ' +
                    '(billing_user_id, billing_address_id, billing_recipient_name, ' +
                    'billing_telephone, billing_status) ' +
                    'VALUES (?, ?, ?, ?, TRUE)';

                connection.query(sql6, [userId, addressId, '', ''], function(err, sixthResult) {
                  if(err) {
                    connection.rollback(function() {
                      throw err;
                    });
                  }

                  var billId = sixthResult.insertId;

                  var sql7 = 'INSERT INTO credit_card_info ' +
                      '(credit_card_user_id, credit_card_billing_address_id, credit_card_type, ' +
                      'credit_card_owner_name, credit_card_expiration_date, credit_card_number, ' +
                      'credit_card_csv, credit_card_status) ' +
                      'VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)';

                  connection.query(sql7, [userId, billId, '', '', '', '', ''], function(err) {
                    if(err) {
                      connection.rollback(function() {
                        throw err;
                      });
                    }

                    var sql8 = 'INSERT INTO question_answer_history ' +
                        '(answer_question_id, answer_user_id, answer_content, answer_status) ' +
                        'VALUES (?, ?, ?, TRUE), (?, ?, ?, TRUE), (?, ?, ?, TRUE)';

                    connection.query(sql8, [
                      [userId, '', ''],
                      [userId, '', ''],
                      [userId, '', '']
                    ], function(err) {

                      if(err) {
                        connection.rollback(function() {
                          throw err;
                        });
                      }

                      connection.commit(function(err) {
                        if(err) {
                          connection.rollback(function() {
                            throw err;
                          });
                        }
                        console.log('Finished Registration!');
                      });

                    });
                  });
                });
              });
            });
          });
        });
      });
    });

  });

};
