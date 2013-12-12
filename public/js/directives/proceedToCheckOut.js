'use strict';

angular.module('eMarketApp').directive('proceedToCheckout', function(User, CartInfo, Helper) {
  return {
    templateUrl: 'views/proceedToCheckout.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element) {

      var page = $($element[0]);

      var statusPopup = page.find('#checkout-statusPopup');
      var statusPopupMessage = page.find('#checkout-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off();
        if(!$scope.checkout) {
          statusPopupMessage.text('Please provide the requested information.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.checkout.paymentMethod || !$scope.checkout.selectedAddress) {
          statusPopupMessage.text('Please provide the requested information.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.checkout.selectedBank && !$scope.checkout.selectedCard) {
          statusPopupMessage.text('Please provide the requested information.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.checkout.selectedBank) {
          $scope.checkout.selectedBank = null;
        } else {
          $scope.checkout.selectedCard = null;
        }
        $.mobile.loading('show');
        User.me().all('submitPayment').post($scope.checkout).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Payment Submitted Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
//              $.mobile.changePage('#home-user');
            }
          });
          $.mobile.changePage('#home-user');
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Payment Not Submitted Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
//              $.mobile.changePage('#shopping-cart');
            }
          });
          console.log('Payment Error', err);
          $.mobile.changePage('#shopping-cart');
        });
      };

    },
    link: function(scope, elem) {

      scope.checkout = { paymentMethod: 'Credit Card' };
      scope.isCreditCard = scope.checkout.paymentMethod === 'Credit Card';

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
        scope.checkout.itemsAmount = scope.cartInfo.itemsAmount;
        scope.checkout.cost = scope.cartInfo.cost;
        scope.checkout.shipping = scope.cartInfo.shipping;

        User.me().getList('creditCards').then(function(creditCardsList) {
          scope.cards = creditCardsList;
          Helper.refreshSelect(cardSelect);
        }, function(err) {
          scope.cards = [];
          Helper.refreshList(cardSelect);
          console.log('Empty Cards', err);
        });

        User.me().getList('banks').then(function(bankAccountsList) {
          scope.banks = bankAccountsList;
          Helper.refreshSelect(bankSelect);
        }, function(err) {
          scope.banks = [];
          Helper.refreshList(cardSelect);
          console.log('Empty Banks', err);
        });

        User.me().getList('mailAddresses').then(function(mailAddressList) {
          scope.mailAddresses = mailAddressList;
          Helper.refreshSelect(addressSelect);
        }, function(err) {
          scope.mailAddresses = [];
          Helper.refreshList(addressSelect);
          console.log('Empty Address', err);
        });

      });

    }
  };
});

