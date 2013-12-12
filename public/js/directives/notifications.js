'use strict';

angular.module('eMarketApp').directive('notifications', function(User, Helper) {
  return {
    templateUrl: 'views/notifications.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      $scope.envelopeImage = '/img/envelope.png';

      $scope.getStatus = function(notification) {
        return notification.isRead ? 'Read' : 'Unread';
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var notificationList = page.find('#notifications-notificationList');
      var notificationMessage = page.find('#notifications-message');
      var notificationPopup = page.find('#notifications-infoPopup');

      var statusPopup = page.find('#notifications-statusPopup');
      var statusPopupMessage = page.find('#notifications-statusPopupMessage');

      scope.readMessage = function(notification) {
        notificationMessage.text(notification.message);
        if(!notification.isRead) {
          notification.isRead = 1;
          notification.put().then(function success(notification) {
            console.log('notification updated', notification);
          }, function error() {
            notification.isRead = 0;
            console.log('Couldnt update notification', arguments);
          });
        }
      };

      var promise = null;

      page.on('pagebeforeshow', function() {

        notificationPopup.on({
          popupbeforeposition: function() {
            var maxHeight = $.mobile.window.innerHeight() / 1.75;
            if(notificationPopup.height() > maxHeight) {
              notificationPopup.css('overflow-y', 'scroll');
              notificationPopup.height(maxHeight);
            }
          }
        });

        promise = User.me().getList('notifications');
        promise.then(function(notifications) {
          scope.notifications = notifications;
          Helper.refreshList(notificationList);
        }, function(err) {
          scope.notifications = [];
          Helper.refreshList(notificationList);
          console.log('Empty Notifications', err);
        });

      });

      page.on('pageshow', function() {

        statusPopup.off();
        promise.then(function(notifications) {
          if(notifications.length === 0) {
            setTimeout(function() {
              statusPopupMessage.text('No notifications found.');
              statusPopup.popup('open');
            });
          }
        }, function() {
          setTimeout(function() {
            statusPopupMessage.text('No notifications found.');
            statusPopup.popup('open');
          });
        });

      });

    }
  };
});
