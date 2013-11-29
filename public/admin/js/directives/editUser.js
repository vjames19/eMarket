'use strict';

angular.module('eMarketApp').directive('editUser', function(UserInfo) {
  return {
    templateUrl: 'views/editUser.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular, Patterns) {

      $scope.patternFirstName = Patterns.user.firstName;
      $scope.patternMiddleName = Patterns.user.middleName;
      $scope.patternLastName = Patterns.user.lastName;
      $scope.patternTelephone = Patterns.address.telephone;
      $scope.patternPassword = Patterns.user.password;

      $scope.submit = function() {
        $.mobile.loading('show');
//        $scope.userInfo.userPassword = $scope.editUser.userPassword;
//        Restangular.one('users', $scope.userInfo.userId).customPUT($scope.userInfo).then(function(userInfo) {
//          $scope.userInfo = userInfo;
        $.mobile.loading('hide');
        $.mobile.changePage('#user-accounts');
//        }, function(err) {
//          alert(err);
//        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      page.on('pagebeforeshow', function() {

        scope.userInfo = UserInfo.userInfo;

      });

    }
  };
});

