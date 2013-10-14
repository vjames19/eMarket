'use strict';

angular.module('eMarketApp').directive('recentlyViewed', function(User) {
  return {
    templateUrl: 'views/recentlyViewed.html',
    restrict: 'E',
    scope: true,
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);
      var recentlyViewedList = page.find('#recentlyViewedList');

      page.on('pagebeforeshow', function() {
        User.me().getList('browsedItems').then(function(items) {
          scope.recentlyViewed = items;
          setTimeout(function() {
            recentlyViewedList.listview('refresh');
          });
        });
      });
    }
  };
});
