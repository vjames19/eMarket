'use strict';

angular.module('eMarketApp').directive('proceedToCheckout', function(User) {
  return {
    templateUrl: 'views/proceedToCheckout.html',
    restrict: 'E',
    scope: {
      itemsAmount: '=',
      cost: '=',
      shipping: '='
    },
    replace: true,
    link: function(scope, elem) {
      scope.paymentMethods = ['Bank', 'Credit Card'];
      scope.paymentMethod = scope.paymentMethods[1];
      scope.isCreditCard = true;

      var page = $(elem[0]);
      page.on('pagebeforeshow', function() {
        User.me().getList('creditCards').then(function(creditCardsList) {
          scope.cards = creditCardsList;
        });
      });

      scope.selectPaymentMethod = function() {
        if(scope.paymentMethod === 'Bank') {
          scope.isCreditCard = false;
          User.me().getList('banks').then(function(bankAccountsList) {
            scope.banks = bankAccountsList;
          });
        }
        else {
          scope.isCreditCard = true;
          User.me().getList('creditCards').then(function(creditCardsList) {
            scope.cards = creditCardsList;
          });
        }
      };
    }
  };
});

