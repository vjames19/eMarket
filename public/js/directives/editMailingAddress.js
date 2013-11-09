'use strict';

angular.module('eMarketApp').directive('editMailingAddress', function(MailingAddressInfo) {
  return {
    templateUrl: 'views/editMailingAddress.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, User) {

      $scope.mailInfo = MailingAddressInfo.mailInfo;

      $scope.submit = function() {
        console.log($scope.mailInfo);
        User.me().one('mailAddresses', $scope.mailInfo.mailAddressId).customPUT($scope.mailInfo)
            .then(function(mailInfo) {
              $scope.mailInfo = mailInfo;
              $.mobile.changePage('#profile');
            }, function(err) {
              alert(err);
            });
      };
    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var primaryCheckBox = page.find('#make-primary');

      page.on('pagebeforeshow', function() {

        if(scope.mailInfo.isPrimary === 1) {
          setTimeout(function() {
            primaryCheckBox.prop('checked', true).checkboxradio('refresh');
          });
        } else {
          setTimeout(function() {
            primaryCheckBox.prop('checked', false).checkboxradio('refresh');
          });
        }

      });

    }
  };
});

