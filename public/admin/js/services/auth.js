'use strict';

angular.module('eMarketApp').factory('Auth', function($rootScope, $http, Admin) {
  var admin = Admin;
  var isLoggedIn = false;
  var unAuthPaths = ['login-admin'];
  return {
    logIn: function(adminData) {
      $http.post('../login', adminData).success(function(realAdmin) {
        admin.adminUserName = realAdmin.username;
        admin.adminId = realAdmin.id;
        $.mobile.changePage('#home-admin');
        isLoggedIn = true;
      }).error(function() {
            $('#loginError').popup('open');
          });

    },
    logOut: function() {
      admin.adminUserName = null;
      admin.adminId = null;
      isLoggedIn = false;
    },
    isLoggedIn: function() {
      return isLoggedIn;
    },
    isValidUnAuthPath: function(path) {
      return path === '' || window._.some(unAuthPaths, function(unAuthPath) {
        console.log(path, unAuthPath, path.indexOf(unAuthPath) >= 0);
        return path.indexOf(unAuthPath) >= 0;
      });
    }
  };
});
