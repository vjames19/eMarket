'use strict';

angular.module('eMarketApp')
  .directive('myEmarketBuying', function () {
    return {
      templateUrl: 'views/myEmarketBuying.html',
      restrict: 'E',
      scope: true,
      replace: true,
      controller: function($scope, Restangular) {
        $scope.purchases = Restangular.one('api/users', 1).getList('purchases');

      }
    };
  });

