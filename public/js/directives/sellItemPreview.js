'use strict';

angular.module('eMarketApp').directive('sellItemPreview', function(SellItem) {
  return {
    templateUrl: 'views/sellItemPreview.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular, User) {

      $scope.submit = function() {
        $.mobile.loading('show');
//        console.log($scope.previewItemInfo);
//        Restangular.all('products').post($scope.previewItemInfo); // TODO <-- Add .then...
//        User.me().all('unsoldProducts').post($scope.previewItemInfo); // TODO <-- Add .then...
        $.mobile.loading('hide');
        $.mobile.changePage('#home-user');
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      page.on('pagebeforeshow', function() {

        scope.previewItemInfo = SellItem.getItemPreview();

        SellItem.isDraft = true;

      });

    }
  };
});
