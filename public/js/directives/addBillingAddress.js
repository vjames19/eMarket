'use strict';

angular.module('eMarketApp').directive('addBillingAddress', function() {
  return {
    templateUrl: 'views/addBillingAddress.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, User, Patterns) {

      $scope.patternFullName = Patterns.user.fullName;
      $scope.patternAddress = Patterns.address.street;
      $scope.patternCountry = Patterns.address.country;
      $scope.patternCity = Patterns.address.city;
      $scope.patternGeoRegion = Patterns.address.geoRegion;
      $scope.patternZipCode = Patterns.address.zipCode;
      $scope.patternTelephone = Patterns.address.telephone;

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

