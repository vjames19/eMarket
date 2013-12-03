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
//        console.log($scope.billInfo);
        $.mobile.loading('show');
//        User.me().one('billAddresses', $scope.billInfo.billAddressId).customPUT($scope.billInfo)
//            .then(function(billInfo) {
//              $scope.billInfo = billInfo;
        $.mobile.loading('hide');
        $.mobile.changePage('#profile');
//            }, function(err) {
//              alert(err);
//            });
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

