'use strict';

angular.module('eMarketApp')
    .directive('addMailingAddress', function () {
      return {
        templateUrl: 'views/addMailingAddress.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            $scope.mailAddresses.userId = User.userId;
            User.me().all('mailAddresses').post($scope.mailAddresses);
            $.mobile.changePage('#profile');
          };
        }
      };
    });

