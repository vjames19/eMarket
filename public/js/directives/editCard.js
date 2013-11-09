'use strict';

angular.module('eMarketApp').directive('editCard', function(User, CardInfo) {
  return {
    templateUrl: 'views/editCard.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope) {
      $scope.submit = function() {
        console.log($scope.cardInfo);
        User.me().one('creditCards', $scope.cardInfo.creditCardId).customPUT($scope.cardInfo)
            .then(function(cardInfo) {
              $scope.cardInfo = cardInfo;
              $.mobile.changePage('#payment-options');
            }, function(err) {
              alert(err);
            });
      };
    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var cardType = page.find('#card-type');
      var addressSelect = page.find('#address-relation');

      scope.cardInfo = CardInfo.cardInfo;

      page.on('pagebeforeshow', function() {

        console.log(CardInfo);
        User.me().all('billaddresses').getList().then(function(addresses) {
          scope.billAddresses = addresses;
          setTimeout(function() {
            cardType.selectmenu('refresh', true);
            addressSelect.selectmenu('refresh', true);
          });
        });

      });
    }
  };
});

