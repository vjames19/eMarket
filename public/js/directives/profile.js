'use strict';

angular.module('eMarketApp')
    .directive('profile', function (User) {
      return {
        templateUrl: 'views/profile.html',
        restrict: 'E',
        scope: true,
        replace: true,
        link: function (scope, elem) {
          var page = $(elem[0]);
          var mailAddressList = page.find('#mailAddressList');
          var billAddressList = page.find('#billAddressList');
          var ratingList = page.find('#ratingList');
          var selectedMailAddress = null;
          var selectedMailAddressIndex = null;
          var selectedBillAddress = null;
          var selectedBillAddressIndex = null;

          scope.submitUser = function () {
            $.mobile.loading('show');
            scope.user.customPUT(scope.user, scope.user.userId).then(function () {
              $.mobile.loading('hide');
            });
          };

          scope.selectMailAddress = function (mailAddress, index) {
            selectedMailAddress = mailAddress;
            selectedMailAddressIndex = index;
          };

          scope.selectBillAddress = function (billAddress, index) {
            selectedBillAddress = billAddress;
            selectedBillAddressIndex = index;
          };

          scope.deleteMailAddress = function () {
            $.mobile.loading('show');
            User.me().one('mailAddresses', selectedMailAddress.mailAddressId).remove().then(function () {
              scope.mailAddresses.splice(selectedMailAddressIndex, 1);
              mailAddressList.listview('refresh');
              $.mobile.loading('hide');
            });
          };

          scope.deleteBillAddress = function () {
            $.mobile.loading('show');
            User.me().one('BillAddresses', selectedBillAddress.billAddressId).remove().then(function () {
              scope.billAddresses.splice(selectedBillAddressIndex, 1);
              billAddressList.listview('refresh');
              $.mobile.loading('hide');
            });
          };


          page.on('pagebeforeshow', function () {

            var user = User.me();

            user.get().then(function (user) {
              scope.user = user;
            });

            user.getList('mailAddresses').then(function (mailAddressesList) {
              scope.mailAddresses = mailAddressesList;
            });

            user.getList('billAddresses').then(function (billAddressesList) {
              scope.billAddresses = billAddressesList;
            });

            user.getList('ratings').then(function (ratings) {
              scope.ratings = ratings;
            });

          });

          page.on('pageshow', function () {
            mailAddressList.listview('refresh');
            billAddressList.listview('refresh');
            ratingList.listview('refresh');
          });
        }
      };
    });
