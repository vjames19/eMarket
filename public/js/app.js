'use strict';

var app = angular.module('eMarketApp', ['restangular']);

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('api/');
});

app.run(function($rootScope, $location, Auth, Product, SellItem) {

  var history = [];
  var itemHistory = [];
  var back = false;
//  var loginPath = 'login-user';
  var loginPath = 'index-page';

  $(window).on('hashchange', function() {
    // If its not logged in and not in a valid unauth page
    if($location.path().indexOf('home-user') >= 0) {
      history = [];
      itemHistory = [];
      back = false;
      SellItem.isDraft = false;
      SellItem.setDraft({condition: 'New'});
      SellItem.setItemPreview({});
    }

    if($location.path().indexOf('my-emarket-drafts') >= 0){
      SellItem.isDraft = true;
      SellItem.setDraft({});
      SellItem.setItemPreview({});
    }

    if(!Auth.isLoggedIn() && !Auth.isValidUnAuthPath($location.path())) {
      $.mobile.changePage('#' + loginPath);
    }
  });

  $(document).on('pagebeforeshow', function(event, data) {
    // If its not logged in and not in a valid unauth page
    if(!back) {
      console.log('pushing user history');
      history.push(data.prevPage.attr('id'));
      itemHistory.push(Product.getItem());
    } else {
      back = false;
    }
  });

  $(document).on('click vclick', '[data-rel=back]', function() {
    back = true;
    Product.setItem(itemHistory.pop());
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
