'use strict';

angular.module('eMarketApp')
    .directive('myEmarketBuying', function(User, Restangular) {
      return {
        templateUrl: 'views/myEmarketBuying.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var bidAndPurchaseList = page.find('#bidAndPurchaseList');

          scope.selectedBid = function(selectedBid) {
            Restangular.one('products', selectedBid.productId).get().then(function(product) {
              scope.setItem(product);
              $.mobile.changePage('#item-view');
            });
          };

          page.on('pagebeforeshow', function() {
            scope.purchases = User.me().getList('purchases');
            scope.bids = User.me().getList('bids');
          });

          page.on('pageshow', function() {
            bidAndPurchaseList.listview('refresh');
          });
        }
      };
    });

