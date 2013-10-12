'use strict';

angular.module('eMarketApp')
    .directive('editBank', function (User) {
      return {
        templateUrl: 'views/editBank.html',
        restrict: 'E',
        scope: {
          bankInfo: '='
        },
        replace: true,
        controller: function ($scope) {
          $scope.submit = function () {
            console.log($scope.cardInfo);
            User.me().one('banks', $scope.bankInfo.bankId).customPUT($scope.bankInfo)
                .then(function (bankInfo) {
                  $scope.bankInfo = bankInfo;
                  $.mobile.changePage('#payment-options');
                }, function (err) {
                  alert(err);
                });
          };
        },
        link: function (scope, elem) {
          var page = $(elem[0]);
          page.on('pagebeforeshow', function () {
            User.me().all('billaddresses').getList().then(function(addresses) {
              scope.billAddresses = addresses;
            });
          });
        }
      };
    });


