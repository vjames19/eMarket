'use strict';

angular.module('eMarketApp').directive('editMailingAddress', function(MailingAddressInfo, Helper) {
  return {
    templateUrl: 'views/editMailingAddress.html',
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

      var statusPopup = page.find('#editMail-statusPopup');
      var statusPopupMessage = page.find('#editMail-statusPopupMessage');

      $scope.submit = function() {
//        console.log($scope.mailInfo);
        $.mobile.loading('show');
//        User.me().one('mailAddresses', $scope.mailInfo.mailAddressId).customPUT($scope.mailInfo)
//            .then(function(mailInfo) {
//              $scope.mailInfo = mailInfo;
        $.mobile.loading('hide');
        $.mobile.changePage('#profile');
//            }, function(err) {
//              alert(err);
//            });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var primaryCheckBox = page.find('#editMail-makePrimary');

      page.on('pagebeforeshow', function() {

        scope.mailInfo = MailingAddressInfo.mailInfo;

        if(scope.mailInfo.isPrimary === 1) {
          primaryCheckBox.prop('checked', true);
          Helper.refreshCheckBox(primaryCheckBox);
        } else {
          primaryCheckBox.prop('checked', false);
          Helper.refreshCheckBox(primaryCheckBox);
        }

      });

    }
  };
});

