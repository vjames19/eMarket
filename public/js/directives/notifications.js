'use strict';

angular.module('eMarketApp')
    .directive('notifications', function(User, Restangular) {
      return {
        templateUrl: 'views/notifications.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
          $scope.getStatus = function(notification) {
            return notification.isRead ? 'Read' : 'Unread';
          };
        },
        link: function(scope, elem) {
          var page = $(elem[0]);
          var notificationList = page.find('#notificationList');
          var notificationPopUp = page.find('#notificationMessage');

          scope.readMessage = function(notification) {
            notificationPopUp.text(notification.message);
            notification.isRead = true;
          };

          page.on('pagebeforeshow', function() {
            scope.notifications = User.me().getList('notifications');
          });

          page.on('pageshow', function() {
            notificationList.listview('refresh');
          });
        }
      };
    });
