'use strict';

angular.module('eMarketApp').directive('editCard', function(User, Helper, CardInfo) {
  return {
    templateUrl: 'views/editCard.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Patterns) {

      $scope.patternOwnerName = Patterns.user.fullName;
      $scope.patternExpDate = Patterns.card.expDate;
      $scope.patternNumber = Patterns.card.number;
      $scope.patternCsv = Patterns.card.csv;

      var page = $($element[0]);

      var statusPopup = page.find('#editCard-statusPopup');
      var statusPopupMessage = page.find('#editCard-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off();
        $scope.cardInfo.expirationDate = $scope.cardInfo.expirationDate + '-01';
        $.mobile.loading('show');
        User.me().one('creditCards', $scope.cardInfo.id).customPUT($scope.cardInfo).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Card Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Card Not Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#payment-options');
            }
          });
          console.log('Card Update Error', err);
        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var cardType = page.find('#editCard-type');
      var addressSelect = page.find('#editCard-associatedAddress');

      page.on('pagebeforeshow', function() {

        scope.cardInfo = CardInfo.cardInfo;

        User.me().getList('billaddresses').then(function(addresses) {
          scope.billAddresses = addresses;
          Helper.refreshSelect(cardType);
          Helper.refreshSelect(addressSelect);
        });

      });

    }
  };
});

