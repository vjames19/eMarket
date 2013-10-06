'use strict';

angular.module('eMarketApp')
    .directive('editMailingAddress', function() {
      return {
        templateUrl: 'views/editMailingAddress.html',
        restrict: 'E',
        scope: {
          mailInfo: '='
        },
        replace: true,
        controller: function($scope, User) {
          $scope.submit = function() {
            console.log($scope.mailInfo);
            User.me().one('mailAddresses', $scope.mailInfo.mailAddressId).customPUT($scope.mailInfo)
                .then(function(mailInfo) {
                  $scope.mailInfo = mailInfo;
                }, function(err) {
                  alert(err);
                });
          }
        }
      };
    });

