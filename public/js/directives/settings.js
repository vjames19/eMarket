'use strict';

angular.module('eMarketApp')
    .directive('settings', function () {
      return {
        templateUrl: 'views/settings.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
