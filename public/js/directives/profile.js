'use strict';

angular.module('eMarketApp')
    .directive('profile', function(User, Restangular) {
      return {
        templateUrl: 'views/profile.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var mailAddressList = page.find('#mailAddressList');
          var billAddressList = page.find('#billAddressList');
          var ratingList = page.find('#ratingList')

          scope.submitUser = function() {
            $.mobile.loading("show");
            scope.user.customPUT(scope.user, scope.user.userId).then(function() {
              $.mobile.loading("hide");
            });
          }

          page.on('pagebeforeshow', function() {
            var user = User.me();
            //            scope.user = user.get();
            user.get().then(function(user) {
              scope.user = user
            });
            scope.mailAddresses = user.getList('mailAddresses');
            scope.billAddresses = user.getList('billAddresses');
            scope.ratings = user.getList('ratings');
          });

          page.on('pageshow', function() {
            mailAddressList.listview('refresh');
            billAddressList.listview('refresh');
            ratingList.listview('refresh');
          });
        }
      };
    });
