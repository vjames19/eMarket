'use strict';

var adminApp = angular.module('eMarketApp', ['restangular']);

adminApp.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('../api/');
});

adminApp.run(function($rootScope, $location, Auth) {

  var history = [];
  var back = false;
  var loginPath = 'login-admin';

  $(window).on('hashchange', function() {

    // If back to main page, reset history
    if($location.path().indexOf('home-admin') >= 0) {
      history = [];
      back = false;
    }

    // If its not logged in and not in a valid unauth page
    if(!Auth.isLoggedIn() && !Auth.isValidUnAuthPath($location.path())) {
      $.mobile.changePage('#' + loginPath);
    }
  });

  $(document).on('pagebeforeshow', function(event, data) {
    // If its not logged in and not in a valid unauth page
    if(!back) {
      console.log('pushing admin history');
      history.push(data.prevPage.attr('id'));
    } else {
      back = false;
    }

  });

  $(document).on('click vclick', '[data-rel=back]', function() {
    back = true;
    $.mobile.changePage('#' + history.pop(), {
      reverse: true,
      changeHash: false
    });
    return false;
  });

});
