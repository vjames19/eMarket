'use strict';

angular.module('eMarketApp')
    .directive('profile', function () {
      return {
        templateUrl: 'views/profile.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
