'use strict';

angular.module('eMarketApp')
    .directive('editCard', function (User) {
      return {
        templateUrl: 'views/editCard.html',
        restrict: 'E',
        scope: {
          cardInfo: '='
        },
        replace: true,
        controller: function ($scope) {
          $scope.submit = function () {
            console.log($scope.cardInfo);
            User.me().one('creditCards', $scope.cardInfo.creditCardId).customPUT($scope.cardInfo)
                .then(function (cardInfo) {
                  $scope.cardInfo = cardInfo;
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

//          $scope.cardOptions = [
//            {card: 'Visa'},
//            {card: 'Master Card'},
//            {card: 'American Express'}
//          ];

//          $scope.changeToPaymentOptionPage = function() {
//            setTimeout(function () {
//              $.mobile.changePage('#payment-options', {transition: 'fade'});
//            }, 500);
//          };
