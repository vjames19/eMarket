'use strict';

angular.module('eMarketApp').directive('editUser', function(UserInfo) {
  return {
    templateUrl: 'views/editUser.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Restangular, Patterns) {

      $scope.patternFirstName = Patterns.user.firstName;
      $scope.patternMiddleName = Patterns.user.middleName;
      $scope.patternLastName = Patterns.user.lastName;
      $scope.patternTelephone = Patterns.address.telephone;
      $scope.patternPassword = Patterns.user.password;

      var page = $($element[0]);

      var statusPopup = page.find('#editUser-statusPopup');
      var statusPopupMessage = page.find('#editUser-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off(); // Unbind any previous events
        if($scope.userInfo.password !== $scope.userInfo.passwordConfirm) {
          statusPopupMessage.text('Passwords do not match.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.userInfo.middleName) {
          $scope.userInfo.middleName = null;
        }
        $.mobile.loading('show');
        Restangular.one('users', $scope.userInfo.id).customPUT($scope.userInfo).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('User Updated Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#user-accounts');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Could not update user Successfully. Email might already exists.');
          statusPopup.popup('open');
          console.log('EditUser Error', err);
        });
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

