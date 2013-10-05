'use strict';

angular.module('eMarketApp')
    .directive('notifications', function () {
      return {
        templateUrl: 'views/notifications.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, Restangular) {
          $scope.notifications = Restangular.one('api/users', 1).getList('notifications');
          $scope.getStatus = function(notification) {
            return notification.isRead ? 'Read' : 'Unread';
          };
        },
        link: function(scope, elem) {
          scope.readMessage = function(notification) {
            $(elem[0]).find('#notificationMessage').text(notification.message);
            notification.isRead = true;
          };
        }
      };
    });
