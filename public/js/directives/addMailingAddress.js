'use strict';

angular.module('eMarketApp').directive('addMailingAddress', function() {
  return {
    templateUrl: 'views/addMailingAddress.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, User) {

      $scope.submit = function() {
        $.mobile.loading('show');
//        $scope.mailAddresses.userId = User.userId;
//        User.me().all('mailAddresses').post($scope.mailAddresses); // TODO <-- missing .then()
        $.mobile.loading('hide');
        $.mobile.changePage('#profile');
      };

    }
  };
});

