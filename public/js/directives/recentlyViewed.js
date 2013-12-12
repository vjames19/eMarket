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

      page.on('pagebeforeshow', function() {

        User.me().getList('browsedItems').then(function(items) {
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
        if(scope.recentlyViewed.length === 0) {
          statusPopupMessage.text('No items have been viewed recently.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#home-user');
            }
          });
        }

      });

    }
  };
});
