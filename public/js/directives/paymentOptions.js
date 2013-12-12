'use strict';

angular.module('eMarketApp').directive('paymentOptions', function(User, Helper) {
  return {
    templateUrl: 'views/paymentOptions.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $filter, CardInfo, BankInfo) {

      $scope.setCardInfo = function(cardInfo) {
        // Adding Filter because node-mysql escape replaces all dates with YYYY-mm-dd HH:ii:ss.
        cardInfo.expirationDate = Helper.formatDate(cardInfo.expirationDate, 'yyyy-MM');
        angular.copy(cardInfo, CardInfo.cardInfo);
      };

      $scope.setBankInfo = function(bankInfo) {
        angular.copy(bankInfo, BankInfo.bankInfo);
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var cardList = page.find('#paymentOptions-cardList');
      var bankList = page.find('#paymentOptions-bankList');

      var deleteBankButton = page.find('#paymentOptions-deleteBankBtn');
      var deleteCardButton = page.find('#paymentOptions-deleteCardBtn');

      var paymentOptionsCardPopup = page.find('#paymentOptions-cardOptionsPopup');
      var paymentOptionsBankPopup = page.find('#paymentOptions-bankOptionsPopup');

      var statusPopup = page.find('#paymentOption-statusPopup');
      var statusPopupMessage = page.find('#paymentOption-statusPopupMessage');

      var selectedCard = null;
      var selectedBank = null;
      var selectedCardIndex = null;
      var selectedBankIndex = null;

      scope.selectCard = function(creditCard, index) {
        selectedCard = creditCard;
        selectedCardIndex = index;
      };

      scope.selectBank = function(bankAccount, index) {
        selectedBank = bankAccount;
        selectedBankIndex = index;
      };

      scope.deleteCreditCard = function() {
        paymentOptionsCardPopup.off();
        statusPopup.off();
        $.mobile.loading('show');
        User.me().one('creditCards', selectedCard.id).remove().then(function() {
          scope.creditCards.splice(selectedCardIndex, 1);
          Helper.refreshList(cardList);

          if(scope.creditCards.length === 1) {
            deleteCardButton.addClass('ui-disabled');
          }
          else {
            deleteCardButton.removeClass('ui-disabled');
          }

          $.mobile.loading('hide');
          paymentOptionsCardPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Card Deleted Successfully.');
              setTimeout(function() {
                statusPopup.popup('open');
                paymentOptionsCardPopup.off();
              }, 250);
            }
          });
          paymentOptionsCardPopup.popup('close');
        }, function(err) {
          $.mobile.loading('hide');
          paymentOptionsCardPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Could not delete card.');
              setTimeout(function() {
                statusPopup.popup('open');
                paymentOptionsCardPopup.off();
              }, 250);
            }
          });
          paymentOptionsCardPopup.popup('close');
          console.log('Error Removing Card', err);
        });
      };

      scope.deleteBankAccount = function() {
        paymentOptionsBankPopup.off();
        statusPopup.off();
        $.mobile.loading('show');
        User.me().one('banks', selectedBank.id).remove().then(function() {
          scope.bankAccounts.splice(selectedBankIndex, 1);
          Helper.refreshList(bankList);

          if(scope.bankAccounts.length === 1) {
            deleteBankButton.addClass('ui-disabled');
          }
          else {
            deleteBankButton.removeClass('ui-disabled');
          }

          $.mobile.loading('hide');
          paymentOptionsBankPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Bank Deleted Successfully.');
              setTimeout(function() {
                statusPopup.popup('open');
                paymentOptionsBankPopup.off();
              }, 250);
            }
          });
          paymentOptionsBankPopup.popup('close');
        }, function(err) {
          $.mobile.loading('hide');
          paymentOptionsBankPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Could not delete bank.');
              setTimeout(function() {
                statusPopup.popup('open');
                paymentOptionsBankPopup.off();
              }, 250);
            }
          });
          paymentOptionsBankPopup.popup('close');
          console.log('Error Removing Bank', err);
        });
      };

      page.on('pagebeforeshow', function() {

        User.me().getList('creditCards').then(function(creditCardsList) {
          scope.creditCards = creditCardsList;
          Helper.refreshList(cardList);
          if(scope.creditCards.length === 1) {
            deleteCardButton.addClass('ui-disabled');
          } else {
            deleteCardButton.removeClass('ui-disabled');
          }
        }, function(err) {
          scope.creditCards = [];
          Helper.refreshList(cardList);
          console.log('Empty Cards', err);
        });

        User.me().getList('banks').then(function(bankAccountsList) {
          scope.bankAccounts = bankAccountsList;
          Helper.refreshList(bankList);
          if(scope.bankAccounts.length === 1) {
            deleteBankButton.addClass('ui-disabled');
          } else {
            deleteBankButton.removeClass('ui-disabled');
          }
        }, function(err) {
          scope.bankAccounts = [];
          Helper.refreshList(bankList);
          console.log('Empty Banks', err);
        });

      });

    }
  };
});
