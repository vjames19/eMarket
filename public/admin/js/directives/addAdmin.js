'use strict';

angular.module('eMarketApp').directive('addAdmin', function(Admin, Helper) {
  return {
    templateUrl: 'views/addAdmin.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular, Patterns) {

      $scope.patternFirstName = Patterns.user.firstName;
      $scope.patternMiddleName = Patterns.user.middleName;
      $scope.patternLastName = Patterns.user.lastName;
      $scope.patternTelephone = Patterns.address.telephone;
      $scope.patternUsername = Patterns.user.username;
      $scope.patternPassword = Patterns.user.password;

      $scope.submit = function() {
        $.mobile.loading('show');
//        Restangular.all('admins').post($scope.addAdmin); <- No then, TODO : Fix later
        $.mobile.loading('hide');
        $.mobile.changePage('#admin-accounts');
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

