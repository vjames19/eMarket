'use strict';

angular.module('eMarketApp').directive('paymentOptions', function(User) {
  return {
    templateUrl: 'views/paymentOptions.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, $filter, CardInfo, BankInfo) {

      $scope.setCardInfo = function(cardInfo) {
        // Adding Filter because node-mysql escape replaces all dates with YYYY-mm-dd HH:ii:ss.
        cardInfo.expirationDate = $filter('date')(new Date(cardInfo.expirationDate), 'yyyy-MM');
        angular.copy(cardInfo, CardInfo.cardInfo);
      };

      $scope.setBankInfo = function(bankInfo) {
        angular.copy(bankInfo, BankInfo.bankInfo);
      };

    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var cardList = page.find('#cardList');
      var bankList = page.find('#bankList');

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
        $.mobile.loading('show');
        User.me().one('creditCards', selectedCard.creditCardId).remove().then(function() {
          scope.creditCards.splice(selectedCardIndex, 1);
          cardList.listview('refresh');
          $.mobile.loading('hide');
        });
      };

      scope.deleteBankAccount = function() {
        $.mobile.loading('show');
        User.me().one('banks', selectedBank.bankId).remove().then(function() {
          scope.bankAccounts.splice(selectedBankIndex, 1);
          bankList.listview('refresh');
          $.mobile.loading('hide');
        });
      };

      page.on('pagebeforeshow', function() {
        User.me().getList('creditCards').then(function(creditCardsList) {
          scope.creditCards = creditCardsList;
          setTimeout(function() {
            cardList.listview('refresh');
          });
        });

        User.me().getList('banks').then(function(bankAccountsList) {
          scope.bankAccounts = bankAccountsList;
          setTimeout(function() {
            bankList.listview('refresh');
          });
        });
      });
    }
  };
});
