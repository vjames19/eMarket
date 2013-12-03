'use strict';

angular.module('eMarketApp').directive('addMailingAddress', function() {
  return {
    templateUrl: 'views/addMailingAddress.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, User, Patterns, $element) {

      $scope.patternFullName = Patterns.user.fullName;
      $scope.patternAddress = Patterns.address.street;
      $scope.patternCountry = Patterns.address.country;
      $scope.patternCity = Patterns.address.city;
      $scope.patternGeoRegion = Patterns.address.geoRegion;
      $scope.patternZipCode = Patterns.address.zipCode;
      $scope.patternTelephone = Patterns.address.telephone;

      var page = $($element[0]);

      var statusPopup = page.find('#addMail-statusPopup');
      var statusPopupMessage = page.find('#addMail-statusPopupMessage');

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

