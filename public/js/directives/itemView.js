'use strict';

angular.module('eMarketApp')
    .directive('itemView', function () {
      return {
        templateUrl: 'views/itemView.html',
        restrict: 'E',
        scope: {
          item: '='
        },
        replace: true
      };
    });
