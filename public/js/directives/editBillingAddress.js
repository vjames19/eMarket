'use strict';

angular.module('eMarketApp').directive('editBillingAddress', function(BillingAddressInfo) {
  return {
    templateUrl: 'views/editBillingAddress.html',
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

      var statusPopup = page.find('#editBill-statusPopup');
      var statusPopupMessage = page.find('#editBill-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off();
        $.mobile.loading('show');

        if(!$scope.billInfo.geoRegion) {
          $scope.billInfo.geoRegion = null;
        }

        User.me().one('billAddresses', $scope.billInfo.id).customPUT($scope.billInfo).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Billing Address Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Billing Address Not Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
          console.log('Billing Address Update Error', err);

        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      page.on('pagebeforeshow', function() {

        scope.billInfo = BillingAddressInfo.billInfo;

      });


    }
  };
});

