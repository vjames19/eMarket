'use strict';

angular.module('eMarketApp').factory('User', function(Restangular) {
  var User = function() {
    var self = this;
    this.username = null;
    this.userId = null;
    this.me = function() {
      if(self.username && self.userId >= 0) {
        return Restangular.one('users', self.userId);
      } else {
        throw 'User is not logged in';
      }
    };
  };
  return new User();
});
