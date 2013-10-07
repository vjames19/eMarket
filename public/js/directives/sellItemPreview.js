'use strict';

angular.module('eMarketApp')
    .directive('sellItemPreview', function() {
      return {
        templateUrl: 'views/sellItemPreview.html',
        restrict: 'E',
        scope: {
          previewItemInfo: '='
        },
        replace: true,
        controller: function($scope, Restangular, User) {
          $scope.submit = function() {
            console.log($scope.previewItemInfo);
            Restangular.all('products').post($scope.previewItemInfo);
            User.me().all('unsoldProducts').post($scope.previewItemInfo);
            $.mobile.changePage('#index-page', {transition: 'fade'});
          };
        }
      };
    });
