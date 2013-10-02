'use strict';

angular.module('eMarketApp')
    .directive('notifications', function () {
      return {
        templateUrl: 'views/notifications.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });
