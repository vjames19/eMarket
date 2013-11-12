'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {

  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
    Auth.logIn({username: $scope.username, password: $scope.password});
//    Auth.logIn({username: 'stuxnet', password: 'stuxnet_pwd'});
    $scope.username = '';
    $scope.password = '';
  };

});
