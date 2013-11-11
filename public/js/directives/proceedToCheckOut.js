'use strict';

angular.module('eMarketApp').directive('proceedToCheckout', function(User, CartInfo, Helper) {
  return {
    templateUrl: 'views/proceedToCheckout.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      $scope.submit = function() {
        $.mobile.loading('show');
        $.mobile.loading('hide');
        $.mobile.changePage('#home-user');
      };

    },
    link: function(scope, elem) {

      scope.paymentMethods = ['Bank', 'Credit Card'];
      scope.paymentMethod = scope.paymentMethods[0];
      scope.isCreditCard = false;

      var page = $(elem[0]);

      var bankSelect = page.find('#select-bank');
      var cardSelect = page.find('#select-card');

      scope.selectPaymentMethod = function() {
        scope.isCreditCard = scope.paymentMethod === 'Credit Card';
      };

      page.on('pagebeforeshow', function() {

        scope.cartInfo = CartInfo.getCartInfo();
        scope.itemsAmount = scope.cartInfo.itemsAmount;
        scope.cost = scope.cartInfo.cost;
        scope.shipping = scope.cartInfo.shipping;

        User.me().getList('creditCards').then(function(creditCardsList) {
          scope.cards = creditCardsList;
          Helper.refreshSelect(bankSelect);
        });

        User.me().getList('banks').then(function(bankAccountsList) {
          scope.banks = bankAccountsList;
          Helper.refreshSelect(cardSelect);
        });

      });

    }
  };
});

