'use strict';

angular.module('eMarketApp').factory('Auth', function($rootScope, $http, User) {
  var user = User;
  var isLoggedIn = false;
  var unAuthPaths = ['index-page', 'register', 'forgot-password'];
//  var unAuthPaths = ['index-page', 'register', 'forgot-password', 'shopping-cart', 'item-view', 'search-results'];
  return {
    logIn: function(userData) {
      $.mobile.loading('show', {
        text: 'Signing In...',
        textVisible: true,
        theme: $.mobile.loader.prototype.options.theme
      });
      console.log('Logging In: ', userData.username);
      $http.post('login', userData).success(function(realUser) {
        user.username = realUser.username;
        user.userId = realUser.id;
        $.mobile.changePage('#home-user');
        isLoggedIn = true;
        $.mobile.loading('hide');
      }).error(function() {
            $.mobile.loading('hide');
            setTimeout(function() {
              $('#index-loginError').popup('open');
            });
          });
    },
    logOut: function() {
      console.log('Logging Out: ', user.username);
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
