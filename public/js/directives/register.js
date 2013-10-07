'use strict';

angular.module('eMarketApp')
    .directive('register', function () {
      return {
        templateUrl: 'views/register.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, Restangular) {

          $scope.submit = function() {

            $.mobile.loading('show');
            Restangular.all('api/users').post($scope.newUser.user).then(function(user) {
              var newUserId = user.userId;
              Restangular.one('api/users', newUserId).all('mailAddresses').post($scope.newUser.mailAddress);
              Restangular.one('api/users', newUserId).all('billAddresses').post($scope.newUser.billAddress);
              Restangular.one('api/users', newUserId).all('creditCards').post($scope.newUser.creditCard);
              $.mobile.loading('hide');
              $.mobile.changePage('#index-page', {transition: 'fade'});
            });
          }
        },
        link: function(scope, elem) {
          var page = $(elem[0]);
          var sameAsCheckBox = page.find('#same-as');
          var billAddress = page.find('#billing-address')
          var selectCountryBillingAddress = page.find('#select-country-billing-address');
          var selectStateBillingAddress = page.find('#select-state-billing-address');
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
