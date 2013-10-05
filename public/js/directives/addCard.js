'use strict';

angular.module('eMarketApp')
    .directive('addCard', function () {
      return {
        templateUrl: 'views/addCard.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

