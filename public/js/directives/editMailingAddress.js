'use strict';

angular.module('eMarketApp').directive('editMailingAddress', function(MailingAddressInfo, Helper) {
  return {
    templateUrl: 'views/editMailingAddress.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, User) {

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
      var primaryCheckBox = page.find('#make-primary');

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

