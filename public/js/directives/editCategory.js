'use strict';

angular.module('eMarketApp')
    .directive('editCategory', function () {
      return {
        templateUrl: 'views/editCategory.html',
        restrict: 'E',
        scope: {
          cardInfo: '='
        },
        replace: true
      };
    });

