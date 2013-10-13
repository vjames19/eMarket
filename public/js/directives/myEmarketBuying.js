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
            User.me().getList('purchases').then(function(purchases) {
              scope.purchases = purchases;
              setTimeout(function() {
                bidAndPurchaseList.listview('refresh');
              });
            });

            User.me().getList('bids').then(function(bids) {
              scope.bids = bids
              setTimeout(function() {
                bidAndPurchaseList.listview('refresh');
              });
            });
          });
        }
      };
    });

