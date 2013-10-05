'use strict';

angular.module('eMarketApp')
    .directive('addUser', function () {
      return {
        templateUrl: 'views/addUser.html',
        restrict: 'E',
        scope: {},
        replace: true
      };
    });

