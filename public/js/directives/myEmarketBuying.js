'use strict';

angular.module('eMarketApp')
  .directive('myEmarketBuying', function (User) {
    return {
      templateUrl: 'views/myEmarketBuying.html',
      restrict: 'E',
      scope: true,
      replace: true,
      link: function(scope, elem) {
        var page = $(elem[0]);
        var bidAndPurchaseList = page.find('#bidAndPurchaseList');

        page.on('pagebeforeshow', function() {
          scope.purchases = User.me().getList('purchases');
        });

        page.on('pageshow', function() {
          bidAndPurchaseList.listview('refresh');
        });
      }

    };
  });

