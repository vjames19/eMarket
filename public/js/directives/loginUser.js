'use strict';

angular.module('eMarketApp').directive('loginUser', function() {
  return {
    templateUrl: 'views/loginUser.html',
    restrict: 'E',
    scope: {},
    replace: true
  };
});
