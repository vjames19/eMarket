'use strict';

angular.module('eMarketApp').directive('addCard', function(User, Helper) {
  return {
    templateUrl: 'views/addCard.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      // init value
      $scope.card = {cardType: 'Visa'};

      $scope.submit = function() {
        $.mobile.loading('show');
//        User.me().all('creditCards').post($scope.card); // TODO <-- missing .then()
        $.mobile.loading('hide');
        $.mobile.changePage('#payment-options');
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var addressSelect = page.find('#address-relation');

      page.on('pagebeforeshow', function() {

        User.me().all('billAddresses').getList().then(function(addresses) {
          scope.billAddresses = addresses;
          Helper.refreshSelect(addressSelect);
        });

      });

    }
  };
});

