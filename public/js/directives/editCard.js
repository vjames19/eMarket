'use strict';

angular.module('eMarketApp').directive('editCard', function(User, Helper, CardInfo) {
  return {
    templateUrl: 'views/editCard.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      $scope.submit = function() {
//        console.log($scope.cardInfo);
        $.mobile.loading('show');
//        User.me().one('creditCards', $scope.cardInfo.creditCardId).customPUT($scope.cardInfo)
//            .then(function(cardInfo) {
//              $scope.cardInfo = cardInfo;
        $.mobile.loading('hide');
        $.mobile.changePage('#payment-options');
//            }, function(err) {
//              alert(err);
//            });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var cardType = page.find('#editCard-type');
      var addressSelect = page.find('#editCard-associatedAddress');

      page.on('pagebeforeshow', function() {

        scope.cardInfo = CardInfo.cardInfo;

        User.me().all('billaddresses').getList().then(function(addresses) {
          scope.billAddresses = addresses;
          Helper.refreshSelect(cardType);
          Helper.refreshSelect(addressSelect);
        });

      });

    }
  };
});

