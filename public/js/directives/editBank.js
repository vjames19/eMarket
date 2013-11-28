'use strict';

angular.module('eMarketApp').directive('editBank', function(User, BankInfo, Helper) {
  return {
    templateUrl: 'views/editBank.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Patterns) {

      $scope.patternBankName = Patterns.bank.name;
      $scope.patternOwnerName = Patterns.user.fullName;
      $scope.patternAccNumber = Patterns.bank.accNum;
      $scope.patternRoutingNumber = Patterns.bank.routing;

      $scope.submit = function() {
//        console.log($scope.cardInfo);
        $.mobile.loading('show');
//        User.me().one('banks', $scope.bankInfo.bankId).customPUT($scope.bankInfo)
//            .then(function(bankInfo) {
//              $scope.bankInfo = bankInfo;
        $.mobile.loading('hide');
        $.mobile.changePage('#payment-options');
//            }, function(err) {
//              alert(err);
//            });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var accountType = page.find('#editBank-accountType');
      var addressSelect = page.find('#editBank-associatedAddress');

      page.on('pagebeforeshow', function() {

        scope.bankInfo = BankInfo.bankInfo;

        User.me().all('billaddresses').getList().then(function(addresses) {
          scope.billAddresses = addresses;
          Helper.refreshSelect(accountType);
          Helper.refreshSelect(addressSelect);
        });

      });

    }
  };
});


