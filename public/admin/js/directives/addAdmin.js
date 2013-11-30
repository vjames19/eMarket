'use strict';

angular.module('eMarketApp').directive('addAdmin', function(Admin, Helper) {
  return {
    templateUrl: 'views/addAdmin.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Restangular, Patterns) {

      $scope.patternFirstName = Patterns.user.firstName;
      $scope.patternMiddleName = Patterns.user.middleName;
      $scope.patternLastName = Patterns.user.lastName;
      $scope.patternTelephone = Patterns.address.telephone;
      $scope.patternUsername = Patterns.user.username;
      $scope.patternPassword = Patterns.user.password;

      var page = $($element[0]);

      var statusPopup = page.find('#addAdmin-statusPopup');
      var statusPopupMessage = page.find('#addAdmin-statusPopupMessage');

      $scope.submit = function() {
        if($scope.addAdmin.password !== $scope.addAdmin.passwordConfirm) {
          statusPopupMessage.text('Passwords do not match.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.addAdmin.middleName) {
          $scope.addAdmin.middleName = null;
        }
        if(!$scope.addAdmin.isRoot) {
          $scope.addAdmin.isRoot = 0;
        }
        $.mobile.loading('show');
        Restangular.all('admins').post($scope.addAdmin).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Admin Added Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#admin-accounts');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Could not add admin Successfully. Username or Email might already exists.');
          statusPopup.popup('open');
          console.log('AddAdmin Error', err);
        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var rootCheckBox = page.find('#addAdmin-makeRoot');

      page.on('pagebeforeshow', function() {

        if(Admin.isRoot === 0) {
          rootCheckBox.checkboxradio('disable');
          Helper.refreshCheckBox(rootCheckBox);
        } else {
          rootCheckBox.checkboxradio('enable');
          Helper.refreshCheckBox(rootCheckBox);
        }

      });

    }
  };
});

