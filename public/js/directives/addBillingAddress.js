'use strict';

angular.module('eMarketApp').directive('addBillingAddress', function() {
  return {
    templateUrl: 'views/addBillingAddress.html',
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

      var statusPopup = page.find('#addBill-statusPopup');
      var statusPopupMessage = page.find('#addBill-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off();
        $.mobile.loading('show');
        if(!$scope.billAddresses.geoRegion) {
          $scope.billAddresses.geoRegion = null;
        }
        User.me().all('billAddresses').post($scope.billAddresses).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Bill Addresses Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Bill Addresses Not Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
          console.log('Bill Addresses Creation Error', err);
        });
      };

    }
  };
});

