'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth, Patterns) {

  $scope.patternUsername = Patterns.user.username;
  $scope.patternPassword = Patterns.user.password;

  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
//    Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'chenchoma', password: 'chenchoma_pwd'});
    $scope.username = '';
    $scope.password = '';
  };

});
