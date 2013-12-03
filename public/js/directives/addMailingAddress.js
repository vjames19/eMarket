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
        statusPopup.off();
        $.mobile.loading('show');
        if(!$scope.mailAddresses.geoRegion) {
          $scope.mailAddresses.geoRegion = null;
        }

        if(!$scope.mailAddresses.isPrimary) {
          $scope.mailAddresses.isPrimary = false;
        }

        User.me().all('mailAddresses').post($scope.mailAddresses).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Mail Address Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Mail Address Not Added Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
          console.log('Mail Address Creation Error', err);
        });
      };
    }
  };
});

