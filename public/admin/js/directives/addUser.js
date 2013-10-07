'use strict';

angular.module('eMarketApp')
    .directive('addUser', function() {
      return {
        templateUrl: 'views/addUser.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, Restangular) {
          $scope.submit = function() {
            $.mobile.loading('show');
            Restangular.all('users').post($scope.addUser.user).then(function(user) {
              Restangular.one('users', user.userId).all('mailAddresses').post($scope.addUser.mailAddress);
              Restangular.one('users', user.userId).all('billAddresses').post($scope.addUser.billAddress);
              Restangular.one('users', user.userId).all('creditCards').post($scope.addUser.creditCard);
              $.mobile.loading('hide');
              $.mobile.changePage('#user-accounts', {transition: 'fade'});
            });
          };
        },
        link: function(scope, elem) {
          var page = $(elem[0]);
          var sameAsCheckBox = page.find('#same-as');
          var billAddress = page.find('#billing-address');
          var selectCountryBillingAddress = page.find('#country-billing-address');
          var selectStateBillingAddress = page.find('#geographical-region-billing-address');
          var cityBillingAddress = page.find('#city-billing-address');
          var zipCodeBillingAddress = page.find('#zip-code-billing-address');

          scope.disableBillAddress = function() {
            billAddress.prop('disabled', sameAsCheckBox.prop('checked'));
            selectCountryBillingAddress.prop('disabled', sameAsCheckBox.prop('checked'));
            selectStateBillingAddress.prop('disabled', sameAsCheckBox.prop('checked'));
            cityBillingAddress.prop('disabled', sameAsCheckBox.prop('checked'));
            zipCodeBillingAddress.prop('disabled', sameAsCheckBox.prop('checked'));
          };
        }
      };
    });

