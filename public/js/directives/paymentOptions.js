'use strict';

angular.module('eMarketApp')
    .directive('paymentOptions', function (User) {
      return {
        templateUrl: 'views/paymentOptions.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var cardList = page.find('#cardList');
          var bankList = page.find('#bankList');

          var card = null;
          var bank = null;

          scope.selectedCard = function (creditCard) {
            card = creditCard;
          };

          scope.selectedBank = function(bankAccount) {
            bank = bankAccount;
          }

          scope.deleteCreditCard = function () {
            $.mobile.loading('show');
            User.me().one('creditCards', card.creditCardId).remove();
            $.mobile.loading('hide');
            scope.refreshDom();
          };

          scope.deleteBankAccount = function() {
            $.mobile.loading('show');
            User.me().one('banks', bank.bankId).remove();
            $.mobile.loading('hide');
            scope.refreshDom();
          }



          page.on('pagebeforeshow', function () {
            scope.creditCards = User.me().getList('creditCards');
            scope.bankAccounts = User.me().getList('banks');
          });
          page.on('pageshow', function() {
            cardList.listview('refresh');
            bankList.listview('refresh');
          });
        }
      };
    });
