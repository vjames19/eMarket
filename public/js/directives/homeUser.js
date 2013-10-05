'use strict';

angular.module('eMarketApp').directive('homeUser', function() {
  return {
    templateUrl: 'views/homeUser.html',
    restrict: 'E',
    scope: {},
    replace: true
  };
});
