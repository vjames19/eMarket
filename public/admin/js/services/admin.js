'use strict';

angular.module('eMarketApp').factory('Admin', function(Restangular) {
  var Admin = function() {
    var self = this;
    this.adminId = null;
    this.adminUserName = null;
    this.isRoot = null;
    this.me = function() {
      if(self.adminUserName && self.isRoot >= 0 && self.adminId >= 0) {
        return Restangular.one('admins', self.adminId);
      } else {
        throw 'Admin is not logged in';
      }
    };
  };
  return new Admin();
});
