'use strict';

angular.module('eMarketApp')
    .directive('addBank', function (User) {
      return {
        templateUrl: 'views/addBank.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
          $scope.submit = function() {
            User.me().all('banks').post($scope.bank);
            $.mobile.changePage('#payment-options');
          };
        },
        link: function (scope, elem) {
          var page = $(elem[0]);
          page.on('pagebeforeshow', function () {
            User.me().all('billAddresses').getList().then(function(addresses) {
              scope.billAddresses = addresses;
            });
          });
        }
      };
    });

