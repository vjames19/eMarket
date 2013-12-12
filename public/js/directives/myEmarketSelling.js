'use strict';

angular.module('eMarketApp').directive('myEmarketSelling', function(User, Helper) {
  return {
    templateUrl: 'views/myEmarketSelling.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Product) {

      $scope.setItem = Product.setItem;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var soldAndUnsoldList = page.find('#myEmSelling-soldAndUnsoldList');

      page.on('pagebeforeshow', function() {

        User.me().getList('unsoldProducts').then(function(unsoldProducts) {
          scope.unsoldProducts = unsoldProducts;
          Helper.refreshList(soldAndUnsoldList);
        }, function(err) {
          scope.unsoldProducts = [];
          Helper.refreshList(soldAndUnsoldList);
          console.log('Empty unsoldProducts', err);
        });

        User.me().getList('soldProducts').then(function(soldProducts) {
          scope.soldProducts = soldProducts;
          Helper.refreshList(soldAndUnsoldList);
        }, function(err) {
          scope.soldProducts = [];
          Helper.refreshList(soldAndUnsoldList);
          console.log('Empty soldProducts', err);
        });

      });

    }
  };
});
