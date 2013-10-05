'use strict';

angular.module('eMarketApp').factory('Auth', function($rootScope, $http, User) {
  var user = User;
  var isLoggedIn = false;
  return {
    logIn: function(userData) {
      $http.post('login', userData).success(function(realUser) {
        user.username = realUser.username;
        user.userId = realUser.id;
        $.mobile.changePage('#index-page');
        isLoggedIn = true;
      }).error(function() {
            $('#loginError').popup('open');
          })

    },
    logOut: function() {
      user.username = null;
      user.userId = null;
      isLoggedIn = false;
    },
    isLoggedIn: function() {
      return isLoggedIn;
    }
  };
});
