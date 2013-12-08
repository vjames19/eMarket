'use strict';

angular.module('eMarketApp').directive('errorPage', function() {
  return {
    templateUrl: '../common/views/errorPage.html',
    restrict: 'E',
    scope: {},
    replace: true
  };
});

