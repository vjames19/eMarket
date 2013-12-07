'use strict';

module.exports.logQuery = function(msg, con) {
  if(process.env.LOG_QUERIES === 'true') {
    console.log(msg, con.sql);
  }
};
