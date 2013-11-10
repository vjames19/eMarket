'use strict';

angular.module('eMarketApp').directive('proceedToCheckout', function(User, CartInfo) {
  return {
    templateUrl: 'views/proceedToCheckout.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {
      scope.paymentMethods = ['Bank', 'Credit Card'];
      scope.paymentMethod = scope.paymentMethods[1];
      scope.isCreditCard = true;

      var page = $(elem[0]);
      page.on('pagebeforeshow', function() {

        scope.cartInfo = CartInfo.getCartInfo();
        scope.itemsAmount = scope.cartInfo.itemsAmount;
        scope.cost = scope.cartInfo.cost;
        scope.shipping = scope.cartInfo.shipping;

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

