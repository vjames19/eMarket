'use strict';

angular.module('eMarketApp').directive('addBank', function(User, Helper) {
  return {
    templateUrl: 'views/addBank.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      $scope.bank = {accountType: 'Checking'};

      $scope.submit = function() {
        $.mobile.loading('show');
//        User.me().all('banks').post($scope.bank); // TODO <-- missing .then()
        $.mobile.loading('hide');
        $.mobile.changePage('#payment-options');
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

