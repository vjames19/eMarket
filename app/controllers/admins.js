'use strict';

exports.isAdmin = function(user) {
  return user.username === 'admin';
};
