'use strict';

angular.module('eMarketApp').factory('Auth', function($rootScope, $http, Admin) {
  var admin = Admin;
  var isLoggedIn = false;
  var unAuthPaths = ['index-page'];

  return {
    logIn: function(adminData) {
      $.mobile.loading('show', {
        text: 'Signing In...',
        textVisible: true,
        theme: $.mobile.loader.prototype.options.theme
      });
      console.log('Logging In: ', adminData.username);
      $http.post('login', adminData).success(function(realAdmin) {
        admin.adminUserName = realAdmin.username;
        admin.adminId = realAdmin.id;
        admin.isRoot = realAdmin.isRoot;
        $.mobile.changePage('#home-admin');
        isLoggedIn = true;
        $.mobile.loading('hide');
      }).error(function() {
            $.mobile.loading('hide');
            $('#index-loginError').popup('open');
          });

    },
    logOut: function() {
      console.log('Logging Out: ', admin.username);
      admin.adminUserName = null;
      admin.adminId = null;
      admin.isRoot = null;
      isLoggedIn = false;
      $http.get('../logout');
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
