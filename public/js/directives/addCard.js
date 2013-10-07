'use strict';

angular.module('eMarketApp')
    .directive('addCard', function () {
      return {
        templateUrl: 'views/addCard.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            User.me().all('creditCards').post($scope.card);
            $.mobile.changePage('#payment-options', {transition: 'fade'});
          }

        }
      };
    });

