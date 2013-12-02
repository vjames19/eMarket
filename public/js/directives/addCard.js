'use strict';

angular.module('eMarketApp').directive('addCard', function(User, Helper) {
  return {
    templateUrl: 'views/addCard.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Patterns) {

      $scope.patternOwnerName = Patterns.user.fullName;
      $scope.patternExpDate = Patterns.card.expDate;
      $scope.patternNumber = Patterns.card.number;
      $scope.patternCsv = Patterns.card.csv;

      // init value
      $scope.card = {cardType: 'Visa'};

      var page = $($element[0]);

      var statusPopup = page.find('#addCard-statusPopup');
      var statusPopupMessage = page.find('#addCard-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off();
        $scope.card.expirationDate = $scope.card.expirationDate + '-01';
        $.mobile.loading('show');
        User.me().all('creditCards').post($scope.card).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Card Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Card Not Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
          console.log('Card Creation Error', err);
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

