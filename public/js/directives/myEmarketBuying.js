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
            Restangular.all('products').getList().then(function(products) {
              if(window._.contains(window._.pluck(products, 'productId'), selectedBid.productId)) {
                Restangular.one('products', selectedBid.productId).get().then(function(item) {
                  console.log('resolved item', item);
                  scope.setItem(item);
                  $.mobile.changePage('#item-view');
                });
              }
            });
          };

          page.on('pagebeforeshow', function() {
            scope.purchases = User.me().getList('purchases');
            scope.biddings = User.me().getList('bids');
          });

          page.on('pageshow', function() {
            bidAndPurchaseList.listview('refresh');
          });
        }

      };
    });

