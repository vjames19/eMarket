'use strict';

angular.module('eMarketApp')
    .directive('addBank', function () {
      return {
        templateUrl: 'views/addBank.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            User.me().all('banks').post($scope.bank);
            $.mobile.changePage('#payment-options', {transition: 'fade'});
          };
        }
      };
    });

