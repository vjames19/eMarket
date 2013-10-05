'use strict';

angular.module('eMarketApp', ['restangular'])
    .run(function($rootScope, $location, Auth) {
      var loginPath = 'login-user';
      $(window).on('hashchange', function(event, data) {
        var path = $location.path();
        // If its not logged in and not in the in the login page, then change to login page.
        if(!Auth.isLoggedIn() && !(path === '' || path.indexOf(loginPath) >= 0 || path.indexOf('register') >= 0)) {
          $.mobile.changePage('#' + loginPath);
        }
      });
    });
