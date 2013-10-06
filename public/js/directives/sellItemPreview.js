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
        controller: function($scope) {

        }
      };
    });
