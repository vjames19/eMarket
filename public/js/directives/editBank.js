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
            scope.billAddresses = User.me().all('billaddresses').getList();
          });
        }
      };
    });

//          $scope.accountOptions = [
//            {account: 'Checking'},
//            {account: 'Saving'},
//            {account: 'Other'}
//          ];

//          $scope.changeToPaymentOptionPage = function() {
//            setTimeout(function () {
//              $.mobile.changePage('#payment-options', {transition: 'fade'});
//            }, 500);
//          };

