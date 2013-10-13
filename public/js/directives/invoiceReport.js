'use strict';

angular.module('eMarketApp').directive('invoiceReport', function() {
  return {
    templateUrl: 'views/invoiceReport.html',
    restrict: 'E',
    scope: {},
    replace: true
  };
});

