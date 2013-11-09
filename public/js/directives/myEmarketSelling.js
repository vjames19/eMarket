'use strict';

angular.module('eMarketApp').directive('myEmarketSelling', function(User) {
  return {
    templateUrl: 'views/myEmarketSelling.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, Product) {
      $scope.setItem = function(product) {
        Product.item = angular.copy(product);
      };
    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var soldAndUnsoldList = page.find('#soldAndUnsoldList');

      page.on('pagebeforeshow', function() {
        User.me().getList('unsoldProducts').then(function(unsoldProducts) {
          scope.unsoldProducts = unsoldProducts;
          setTimeout(function() {
            soldAndUnsoldList.listview('refresh');
          });
        });

        User.me().getList('soldProducts').then(function(soldProducts) {
          scope.soldProducts = soldProducts;
          setTimeout(function() {
            soldAndUnsoldList.listview('refresh');
          });
        });
      });
    }
  };
});
