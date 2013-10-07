'use strict';

angular.module('eMarketApp')
    .directive('addCard', function (User) {
      return {
        templateUrl: 'views/addCard.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
          $scope.submit = function() {
            User.me().all('creditCards').post($scope.card);
            $.mobile.changePage('#payment-options', {transition: 'fade'});
          };
        },
        link: function (scope, elem) {
          var page = $(elem[0]);
          page.on('pagebeforeshow', function () {
            scope.billAddresses = User.me().all('billaddresses').getList();
          });
        }
      };
    });

