'use strict';

angular.module('eMarketApp').factory('Auth', function($http, User) {
  var user = User;
  var isLoggedIn = false;
  return {
    logIn: function(userData) {
      $http.post('login', userData).success(function(realUser) {
        console.log('success', arguments);
        user.username = realUser.username;
        user.userId = realUser.userId;
        $.mobile.changePage('#index-page');
        isLoggedIn = true;
      }).error(function(error) {
            console.log('errr', arguments)
            $('#loginError').popup()
            $('#loginError').popup('open');
            console.log($('loginError'))
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
