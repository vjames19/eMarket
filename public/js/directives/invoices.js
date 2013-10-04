'use strict';

angular.module('eMarketApp')
    .directive('invoices', function () {
      return {
        templateUrl: 'views/invoices.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, Restangular) {
          // TODO: replace with real user id.
          $scope.invoices = Restangular.one('api/users', 1).getList('invoices');
        }
      };
    });
