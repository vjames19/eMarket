'use strict';

angular.module('eMarketApp').directive('editBank', function(User, BankInfo, Helper) {
  return {
    templateUrl: 'views/editBank.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Patterns) {

      $scope.patternBankName = Patterns.bank.name;
      $scope.patternOwnerName = Patterns.user.fullName;
      $scope.patternAccNumber = Patterns.bank.accNum;
      $scope.patternRoutingNumber = Patterns.bank.routing;

      var page = $($element[0]);

      var statusPopup = page.find('#editBank-statusPopup');
      var statusPopupMessage = page.find('#editBank-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off();
        $.mobile.loading('show');
        User.me().one('banks', $scope.bankInfo.id).customPUT($scope.bankInfo).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Bank Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Bank Not Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
          console.log('Bank Update Error', err);
        });
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


