'use strict';

angular.module('eMarketApp').directive('recentlyViewed', function(User, Helper) {
  return {
    templateUrl: 'views/recentlyViewed.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Product) {

      $scope.setItem = Product.setItem;

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var recentlyViewedList = page.find('#recentlyViewedList');

      page.on('pagebeforeshow', function() {

        User.me().getList('browsedItems').then(function(items) {
          scope.recentlyViewed = items;
          Helper.refreshList(recentlyViewedList);
        });

      });

    }
  };
});
