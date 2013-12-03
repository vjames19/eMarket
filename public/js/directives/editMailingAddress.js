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
        statusPopup.off();
        $.mobile.loading('show');
        if(!$scope.mailInfo.geoRegion) {
          $scope.mailInfo.geoRegion = null;
        }

        if(!$scope.mailInfo.isPrimary) {
          $scope.mailInfo.isPrimary = false;
        }

        User.me().one('mailAddresses', $scope.mailInfo.id).customPUT($scope.mailInfo).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Mailing Address Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Mailing Address Not Updated Successfully');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#profile');
            }
          });
          console.log('Mailing Address Update Error', err);
        });
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

