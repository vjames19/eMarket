'use strict';

angular.module('eMarketApp', ['restangular'])
    .run(function($rootScope, $location, Auth) {
      var loginPath = 'login-user';
      $(window).on('hashchange', function() {
        // If its not logged in and not in a valid unauth page
        if(!Auth.isLoggedIn() && !Auth.isValidUnAuthPath($location.path())) {
          $.mobile.changePage('#' + loginPath);
        }
      });
    });
