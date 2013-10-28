'use strict';

angular.module('eMarketApp').directive('proceedToCheckout', function(User, Restangular) {
  return {
    templateUrl: 'views/proceedToCheckout.html',
    restrict: 'E',
    scope: true,
    replace: true,
    link: function(scope, elem) {

      scope.paymentMethods = [
        {
          value: 'Bank'
        },
        {
          value: 'Credit Card'
        }
      ];

      scope.selectedPaymentMethod = function(paymentMethod) {
        if(paymentMethod.value === 'Bank') {
          User.me().getList('banks').then(function(bankAccountsList) {
            scope.banksOrCards = bankAccountsList;
          });
        }
        else {
          User.me().getList('creditCards').then(function(creditCardsList) {
            scope.banksOrCards = creditCardsList;
          });
        }
      }
    }
  };
});

