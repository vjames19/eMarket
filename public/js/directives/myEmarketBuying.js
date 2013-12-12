'use strict';

angular.module('eMarketApp').directive('myEmarketBuying', function(User, Helper) {
  return {
    templateUrl: 'views/myEmarketBuying.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Product) {

      $scope.setItem = Product.setItem;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var bidAndPurchaseList = page.find('#myEmBuying-bidAndPurchaseList');

      page.on('pagebeforeshow', function() {

        User.me().getList('purchases').then(function(purchases) {
          scope.purchases = purchases;
          Helper.refreshList(bidAndPurchaseList);
        }, function(err) {
          scope.purchases = [];
          Helper.refreshList(bidAndPurchaseList);
          console.log('Empty Purchases', err);
        });

        User.me().getList('bids').then(function(bids) {
          scope.bids = bids;
          Helper.refreshList(bidAndPurchaseList);
        }, function(err) {
          scope.bids = [];
          Helper.refreshList(bidAndPurchaseList);
          console.log('Empty Bids', err);
        });

      });

    }
  };
});

