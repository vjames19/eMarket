'use strict';

angular.module('eMarketApp')
    .directive('editBank', function () {
      return {
        templateUrl: 'views/editBank.html',
        restrict: 'E',
        scope: {
          bankInfo: '='
        },
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            console.log($scope.cardInfo);
            User.me().one('banks', $scope.bankInfo.bankId).customPUT($scope.bankInfo)
                .then(function(bankInfo) {
                  $scope.bankInfo = bankInfo;
                  $.mobile.changePage('#payment-options');
                }, function(err) {
                    alert(err);
                });
          };

//          $scope.changeToPaymentOptionPage = function() {
//            setTimeout(function () {
//              $.mobile.changePage('#payment-options', {transition: 'fade'});
//            }, 500);
//          };
        }
      };
    });

