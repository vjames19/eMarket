'use strict';

angular.module('eMarketApp')
    .directive('addBillingAddress', function () {
      return {
        templateUrl: 'views/addBillingAddress.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            $scope.billAddresses.userId = User.userId;
            User.me().all('billAddresses').post($scope.billAddresses);
            $.mobile.changePage('#profile', {transition: 'fade'});
          };
        }
      };
    });

