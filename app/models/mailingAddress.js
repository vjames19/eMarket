'use strict';

//var _ = require('underscore');
var mapper = require('../mapper');

var DICTIONARY = {
  'mailing_id': 'id',
  'mailing_user_id': 'userId',
  'mailing_address_id': 'addressId',
  'mailing_recipient_name': 'recipientName',
  'mailing_telephone': 'telephone',
  'mailing_is_primary': 'isPrimary',
  'address_address': 'address',
  'address_country': 'country',
  'address_city': 'city',
  'address_geographical_region': 'geoRegion',
  'address_zipcode': 'zipCode'
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
      var sql = 'SELECT mailing_id, mailing_address_id, mailing_recipient_name, mailing_telephone, ' +
          'mailing_is_primary, address_address, address_country, ' +
          'address_city, address_geographical_region, address_zipcode ' +
          'FROM mailing_info INNER JOIN address_history ' +
          'ON (mailing_info.mailing_address_id = address_history.address_id) ' +
          'WHERE mailing_info.mailing_user_id = ? AND mailing_info.mailing_status = 1 ' +
          'ORDER BY address_geographical_region';
      connection.query(sql, [userId], function(err, mailingAddresses) {
        callback(err, mapper.mapCollection(mailingAddresses, DICTIONARY));
      });
    }
  });
};

module.exports.get = function(userId, mailingId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'SELECT mailing_id, mailing_address_id, mailing_recipient_name, mailing_telephone, ' +
          'mailing_is_primary, address_address, address_country, ' +
          'address_city, address_geographical_region, address_zipcode ' +
          'FROM mailing_info INNER JOIN address_history INNER JOIN user_info ' +
          'ON (mailing_info.mailing_address_id=address_history.address_id) ' +
          'AND (mailing_info.mailing_user_id=user_info.user_id) ' +
          'WHERE user_info.user_id = ? AND mailing_info.mailing_status = 1 AND mailing_info.mailing_id = ? ' +
          'ORDER BY address_geographical_region';
      connection.query(sql, [userId, mailingId], function(err, mailingAddress) {
        callback(err, mapper.map(mailingAddress[0], DICTIONARY));
      });
    }
  });
};

module.exports.create = function(mailAddress, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'INSERT INTO address_history ' +
          '(address_address, address_country, address_city, address_geographical_region, address_zipcode) ' +
          'VALUES (?, ?, ?, ?, ?)';
      var sql2 = 'UPDATE mailing_info ' +
          'SET mailing_is_primary = FALSE ' +
          'WHERE mailing_user_id = ? AND mailing_status = TRUE';
      var sql3 = 'INSERT INTO mailing_info ' +
                 '(mailing_user_id, mailing_address_id, mailing_recipient_name, mailing_telephone, ' +
                 'mailing_is_primary, mailing_status) ' +
                 'VALUES (?, ?, ?, ?, ?, ?)';
      connection.beginTransaction(function(err) {
        if(err) {
          callback(err);
        } else {
          var params1 = [mailAddress.mailAddress, mailAddress.country, mailAddress.city, mailAddress.geoRegion, mailAddress.zipCode];
          connection.query(sql1, params1, function(err, insertStatus) {
            if(err) {
              connection.rollback(function() {
                callback(err);
              });
            } else {
              var addressId = insertStatus.insertId;
              var params3 = [userId, addressId, mailAddress.recipientName, mailAddress.telephone,
                mailAddress.isPrimary, true];

              if(mailAddress.isPrimary) {
                connection.query(sql2, [userId], function(err) {
                  if(err) {
                    connection.rollback(function() {
                      callback(err);
                    });
                  } else {
                    connection.query(sql3, params3, function(err) {
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
                          }
                          else {
                            callback(null, mailAddress);
                            console.log('Mailing Address Created Successfully.');
                          }
                        });
                      }
                    });
                  }
                });
              } else {
                connection.query(sql3, params3, function(err) {
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
                      }
                      else {
                        callback(null, mailAddress);
                        console.log('Mailing Address Created Successfully.');
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

module.exports.update = function(mailAddress, userId, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql1 = 'UPDATE address_history ' +
          'SET address_address = ?, address_country = ?, address_city = ?, ' +
          'address_geographical_region = ?, address_zipcode = ? ' +
          'WHERE address_id = ?';
      var sql2 = 'UPDATE mailing_info ' +
          'SET mailing_is_primary = FALSE ' +
          'WHERE mailing_user_id = ? AND mailing_status = TRUE';
      var sql3 = 'UPDATE mailing_info ' +
                 'SET mailing_recipient_name = ?, mailing_telephone = ?, mailing_is_primary = ? ' +
                 'WHERE mailing_id = ? AND mailing_user_id = ?';

      connection.beginTransaction(function(err) {
        if(err) {
          connection.rollback(function() {
            callback(err);
          });
        } else {
          var params1 = [
            mailAddress.address, mailAddress.country, mailAddress.city,
            mailAddress.geoRegion, mailAddress.zipCode, mailAddress.id
          ];
          connection.query(sql1, params1, function(err) {
            if(err) {
              connection.rollback(function(){
                callback(err);
              });
            } else {
              var params3 = [mailAddress.recipientName, mailAddress.telephone,
                mailAddress.isPrimary, mailAddress.id, userId];

              if(mailAddress.isPrimary) {
                connection.query(sql2, [userId], function(err) {
                  if(err) {
                    connection.rollback(function() {
                      callback(err);
                    });
                  } else {
                    connection.query(sql3, params3, function(err) {
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
                            callback(null, mailAddress);
                            console.log('Mailing Address Updated Successfully.');
                          }
                        });
                      }
                    });
                  }
                });
              } else {
                connection.query(sql3, params3, function(err) {
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
                        callback(null, mailAddress);
                        console.log('Mailing Address Updated Successfully.');
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

module.exports.remove = function(mailingAddress, callback) {
  executor.execute(function(err, connection) {
    if(err) {
      callback(err);
    } else {
      var sql = 'UPDATE mailing_info ' +
                 'SET mailing_status = FALSE ' +
                 'WHERE mailing_id = ?';
      connection.query(sql, [mailingAddress.id], function(err) {
        callback(err, mailingAddress);
      });
    }
  });
};
