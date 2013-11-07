'use strict';

angular.module('eMarketApp').directive('sellItemPreview', function(SellItem) {
  return {
    templateUrl: 'views/sellItemPreview.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular, User) {
      $scope.submit = function() {
        console.log($scope.previewItemInfo);
        Restangular.all('products').post($scope.previewItemInfo);
        User.me().all('unsoldProducts').post($scope.previewItemInfo);
        $.mobile.changePage('#home-user');
      };
    },
    link: function(scope, elem) {
      var page = $(elem[0]);

      page.on('pagebeforeshow', function() {
        scope.previewItemInfo = SellItem.itemPreview;
        SellItem.isDraft = true;
      });
    }
  };
});
