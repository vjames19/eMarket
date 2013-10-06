'use strict';

angular.module('eMarketApp')
    .directive('editCard', function () {
      return {
        templateUrl: 'views/editCard.html',
        restrict: 'E',
        scope: {
          cardInfo: '='
        },
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            User.me().one('creditCards', $scope.cardInfo.creditCardId).customPUT($scope.cardInfo)
                .then(function(cardInfo) {
                  $scope.cardInfo = cardInfo;
                }, function(err) {
                  alert(err);
                });
          };

          $scope.changeToPaymentOptionPage = function() {
            setTimeout(function () {
              $.mobile.changePage('#payment-options', {transition: 'fade'});
            }, 500);
          };

        }
      };
    });

