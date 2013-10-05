'use strict';

angular.module('eMarketApp')
    .directive('addCategory', function () {
      return {
        templateUrl: 'views/addCategory.html',
        restrict: 'E',
        scope: {
          cardInfo: '='
        },
        replace: true
      };
    });

