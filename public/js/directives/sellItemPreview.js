'use strict';

angular.module('eMarketApp')
    .directive('sellItemPreview', function () {
      return {
        templateUrl: 'views/sellItemPreview.html',
        restrict: 'E',
        scope: {
          previewItemInfo: '='
        },
        replace: true,
        controller: function($scope, Restangular) {
          $scope.submit = function() {
            console.log($scope.previewItemInfo);
            Restangular.all('api/products').post($scope.previewItemInfo);

          }

          $scope.changeToHome = function() {
            $.mobile.changePage('#index-page', {transition: "fade"});
          }
        }
      }
    });
