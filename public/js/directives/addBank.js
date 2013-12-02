'use strict';

angular.module('eMarketApp').directive('addBank', function(User, Helper) {
  return {
    templateUrl: 'views/addBank.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Patterns) {

      $scope.patternBankName = Patterns.bank.name;
      $scope.patternOwnerName = Patterns.user.fullName;
      $scope.patternAccNumber = Patterns.bank.accNum;
      $scope.patternRoutingNumber = Patterns.bank.routing;

      $scope.bank = {accountType: 'Checking'};

      var page = $($element[0]);

      var statusPopup = page.find('#addBank-statusPopup');
      var statusPopupMessage = page.find('#addBank-statusPopupMessage');

      $scope.submit = function() {
        $.mobile.loading('show');
        User.me().all('banks').post($scope.bank).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Bank Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Bank Not Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
          console.log('Bank Creation Error', err);
        });
      };
    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var addressSelect = page.find('#associatedAddress');

      page.on('pagebeforeshow', function() {

        User.me().all('billAddresses').getList().then(function(addresses) {
          scope.billAddresses = addresses;
          Helper.refreshSelect(addressSelect);
        });

      });

    }
  };
});

