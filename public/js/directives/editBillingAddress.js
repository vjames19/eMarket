'use strict';

angular.module('eMarketApp').directive('editBillingAddress', function(BillingAddressInfo) {
  return {
    templateUrl: 'views/editBillingAddress.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, User) {
      $scope.submit = function() {
        console.log($scope.billInfo);
        User.me().one('billAddresses', $scope.billInfo.billAddressId).customPUT($scope.billInfo)
            .then(function(billInfo) {
              $scope.billInfo = billInfo;
              $.mobile.changePage('#profile');
            }, function(err) {
              alert(err);
            });
      };
    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      scope.billInfo = BillingAddressInfo.billInfo;

      page.on('pagebeforeshow', function() {

      });


    }
  };
});

