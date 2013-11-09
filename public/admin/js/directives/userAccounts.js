'use strict';

angular.module('eMarketApp').directive('userAccounts', function(Restangular, Helper) {
  return {
    templateUrl: 'views/userAccounts.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, UserInfo) {
      $scope.setUserInfo = function(userInfo) {
        UserInfo.userInfo = angular.copy(userInfo);
      };
    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var userAccountList = page.find('#userAccountList');

      var selectedUser = null;
      var selectedUserIndex = null;

      scope.selectUser = function(user, index) {
        selectedUser = user;
        selectedUserIndex = index;
      };

      scope.deleteUser = function() {
        $.mobile.loading('show');
        Restangular.one('users', selectedUser.userId).remove().then(function() {
          scope.users.splice(selectedUserIndex, 1);
          Helper.refreshList(userAccountList, true); // no callback
          $.mobile.loading('hide');
        });
      };

      page.on('pagebeforeshow', function() {
        Restangular.all('users').getList().then(function(userList) {
          scope.users = userList;
          Helper.refreshList(userAccountList);
        });
      });

    }
  };
});

