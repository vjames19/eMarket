'use strict';

angular.module('eMarketApp')
    .directive('editBillingAddress', function() {
      return {
        templateUrl: 'views/editBillingAddress.html',
        restrict: 'E',
        scope: {
          billInfo: '='
        },
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            console.log($scope.billInfo);
            User.me().one('billAddresses', $scope.billInfo.billAddressId).customPUT($scope.billInfo)
                .then(function(billInfo) {
                  $scope.billInfo = billInfo;
                }, function(err) {
                  alert(err);
                });
          }
        }
      };
    });

