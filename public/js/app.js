'use strict';

var app = angular.module('eMarketApp', ['restangular'])

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('api/');
});

app.run(function($rootScope, $location, Auth) {

  var history = [];
  var back = false;
  var loginPath = 'login-user';

  $(window).on('hashchange', function() {
    // If its not logged in and not in a valid unauth page
    if($location.path().indexOf('index-page') >= 0) {
      history = [];
      back = false;
    }

    if(!Auth.isLoggedIn() && !Auth.isValidUnAuthPath($location.path())) {
      $.mobile.changePage('#' + loginPath);
    }
  });

  $(document).on('pagebeforeshow', function(event, data) {
    // If its not logged in and not in a valid unauth page
    if(!back) {
      console.log('pushing histor')
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

  //  $(document).find('#loginSearch').submit(function(e) {
  //    console.log("submitting");
  //    e.preventDefault();
  //    $.mobile.changePage('#search-results', { data: 'addfasdfds'});
  //  });
});
