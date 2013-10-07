'use strict';

angular.module('eMarketApp')
    .directive('profile', function (User) {
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

          page.on('pagebeforeshow', function() {
            var user = User.me();
            scope.user = user.get();
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
