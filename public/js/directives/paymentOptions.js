'use strict';

angular.module('eMarketApp')
    .directive('paymentOptions', function () {
      return {
        templateUrl: 'views/paymentOptions.html',
        restrict: 'E',
        scope: true,
        replace: true,
        controller: function($scope, Restangular) {
            $scope.creditCards = Restangular.one('api/users', 1).getList('creditCards');
            $scope.bankAccounts = Restangular.one('api/users', 1).getList('banks');
        }
      };
    });
