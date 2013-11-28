'use strict';

angular.module('eMarketApp').directive('addMailingAddress', function() {
  return {
    templateUrl: 'views/addMailingAddress.html',
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
        $.mobile.loading('show');
//        $scope.mailAddresses.userId = User.userId;
//        User.me().all('mailAddresses').post($scope.mailAddresses); // TODO <-- missing .then()
        $.mobile.loading('hide');
        $.mobile.changePage('#profile');
      };

    }
  };
});

