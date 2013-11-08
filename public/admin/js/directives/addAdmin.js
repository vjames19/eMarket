'use strict';

angular.module('eMarketApp').directive('addAdmin', function() {
  return {
    templateUrl: 'views/addAdmin.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular) {
      $scope.submit = function() {
        Restangular.all('admins').post($scope.addAdmin);
        $.mobile.changePage('#admin-accounts');
      };
    }
  };
});

