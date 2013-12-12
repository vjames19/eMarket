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

      var recentlyViewedList = page.find('#recentViewed-recentlyViewedList');

      var statusPopup = page.find('#recentViewed-statusPopup');
      var statusPopupMessage = page.find('#recentViewed-statusPopupMessage');

      var promise = null;

      page.on('pagebeforeshow', function() {

        promise = User.me().getList('browsedItems');
        promise.then(function(items) {
          scope.recentlyViewed = items;
          Helper.refreshList(recentlyViewedList);
        }, function(err) {
          scope.recentlyViewed = [];
          Helper.refreshList(recentlyViewedList);
          console.log('Empty recentlyViewed', err);
        });

      });

      page.on('pageshow', function() {

        statusPopup.off();
        promise.then(function(recentlyViewed) {
          if(recentlyViewed.length === 0) {
            statusPopupMessage.text('No items have been viewed recently.');
            statusPopup.popup('open');
          }
        }, function() {
          statusPopupMessage.text('No items have been viewed recently.');
          statusPopup.popup('open');
        });

      });

    }
  };
});
