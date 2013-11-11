'use strict';

angular.module('eMarketApp').directive('addBillingAddress', function() {
  return {
    templateUrl: 'views/addBillingAddress.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, User) {

      $scope.submit = function() {
//        $scope.billAddresses.userId = User.userId;
        $.mobile.loading('show');
//        User.me().all('billAddresses').post($scope.billAddresses); // TODO <-- missing .then()
        $.mobile.loading('hide');
        $.mobile.changePage('#profile');
      };

    }
  };
});

