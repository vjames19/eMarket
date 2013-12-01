'use strict';

angular.module('eMarketApp').directive('editAdmin', function(AdminInfo, Helper, Admin) {
  return {
    templateUrl: 'views/editAdmin.html',
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

      var statusPopup = page.find('#editAdmin-statusPopup');
      var statusPopupMessage = page.find('#editAdmin-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off(); // Unbind any previous events
        if($scope.adminInfo.password !== $scope.adminInfo.passwordConfirm) {
          statusPopupMessage.text('Passwords do not match.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.adminInfo.middleName) {
          $scope.adminInfo.middleName = null;
        }
        if(!$scope.adminInfo.isRoot) {
          $scope.adminInfo.isRoot = 0;
        }
        $.mobile.loading('show');
        Restangular.one('admins', $scope.adminInfo.id).customPUT($scope.adminInfo).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Admin Updated Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#admin-accounts');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Could not update admin Successfully. Username or Email might already exists.');
          statusPopup.popup('open');
          console.log('AddAdmin Error', err);
        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var rootCheckBox = page.find('#editAdmin-makeRoot');

      page.on('pagebeforeshow', function() {

        scope.adminInfo = AdminInfo.adminInfo;

        if(scope.adminInfo.isRoot === 1) {
          rootCheckBox.prop('checked', true);
          Helper.refreshCheckBox(rootCheckBox);
        } else {
          rootCheckBox.prop('checked', false);
          Helper.refreshCheckBox(rootCheckBox);
        }

        if(Admin.isRoot === 0 || scope.adminInfo.username === 'root') {
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

