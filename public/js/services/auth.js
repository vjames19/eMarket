'use strict';

angular.module('eMarketApp').factory('Auth', function($rootScope, $http, User) {
  var user = User;
  var isLoggedIn = false;
  var unAuthPaths = ['login-user', 'register', 'forgot-password', 'shopping-cart', 'item-view', 'search-results'];
  return {
    logIn: function(userData) {
      $http.post('login', userData).success(function(realUser) {
        user.username = realUser.username;
        user.userId = realUser.id;
        $.mobile.changePage('#index-page');
        isLoggedIn = true;
      }).error(function() {
            $('#loginError').popup('open');
          });

    },
    logOut: function() {
      console.log('logging out');
      user.username = null;
      user.userId = null;
      isLoggedIn = false;
      $http.get('logout');
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
