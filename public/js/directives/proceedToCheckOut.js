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

      scope.checkout = { paymentMethod: 'Bank' };
      scope.isCreditCard = false;

      var page = $(elem[0]);

      var bankSelect = page.find('#checkout-bankSelect');
      var cardSelect = page.find('#checkout-cardSelect');
      var addressSelect = page.find('#checkout-addressSelect');

      scope.selectPaymentMethod = function() {
        delete scope.checkout.selectedBank;
        delete scope.checkout.selectedCard;
        scope.isCreditCard = scope.checkout.paymentMethod === 'Credit Card';
        Helper.refreshSelect(bankSelect);
        Helper.refreshSelect(cardSelect);
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

        User.me().getList('mailAddresses').then(function(mailAddressList) {
          scope.mailAddresses = mailAddressList;
          Helper.refreshSelect(addressSelect);
        });

      });

    }
  };
});

