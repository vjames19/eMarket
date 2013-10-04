'use strict';

angular.module('eMarketApp')
    .directive('notifications', function () {
      return {
        templateUrl: 'views/notifications.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope) {
          $scope.notifications = [
            {state: 'Unread', message: 'Asus market...'},
            {state: 'Read', message: 'How long is it going to take'}
          ];
        },
        link: function(scope, elem) {
          scope.setMessage = function(notification) {
            $(elem[0]).find('#notificationMessage').text(notification.message);
          }
        }
      };
    });
