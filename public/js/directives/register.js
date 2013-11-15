'use strict';

angular.module('eMarketApp').directive('register', function(Restangular, Helper) {
  return {
    templateUrl: 'views/register.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Restangular) {

      $scope.register = { cardType: 'Visa' };

      var page = $($element[0]);

      var changedPopup = page.find('#register-changeStatus');
      var changedMessage = page.find('#register-changeStatusMessage');

      $scope.submit = function() {
        if($scope.register.password !== $scope.register.passwordConfirm) {
          changedMessage.text('Passwords do not match.');
          changedPopup.popup('open');
          return;
        }
        var questions = [
          $scope.register.securityQuestion1,
          $scope.register.securityQuestion2,
          $scope.register.securityQuestion3
        ];
        if(window._.uniq(questions).length !== 3) {
          changedMessage.text('All three questions must be different.');
          changedPopup.popup('open');
          return;
        }
        if(!$scope.register.middleName) {
          $scope.register.middleName = null;
        }
        if(!$scope.register.mailingGeographicalRegion) {
          $scope.register.mailingGeographicalRegion = null;
        }
        if(!$scope.register.billingGeographicalRegion) {
          $scope.register.billingGeographicalRegion = null;
        }
        if($scope.register.sameAsMailing === true) {
          $scope.register.billingAddress = $scope.register.mailingAddress;
          $scope.register.billingCountry = $scope.register.mailingCountry;
          $scope.register.billingGeographicalRegion = $scope.register.mailingGeographicalRegion;
          $scope.register.billingCity = $scope.register.mailingCity;
          $scope.register.billingZipCode = $scope.register.mailingZipCode;
        }
        $.mobile.loading('show');
        Restangular.all('../register').post($scope.register).then(function() {
          $.mobile.loading('hide');
          changedMessage.text('Registration successful. ' +
              'Your username is ' + $scope.register.username + '. ' +
              'Your password is ' + $scope.register.password + '.');
          changedPopup.popup('open');
          changedPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#index-page'); //Force user to put hes newly registered credentials
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          changedMessage.text('Could not Finish Registration. ' +
              'Username or Email might be already registered.');
          changedPopup.popup('open');
          console.log('Registration Error', err);
        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var sameAsCheckBox = page.find('#register-sameAsMailing');
      var securityQuestions = page.find('select[id*="register-securityQuestion"]');
      var billingAddressFields = page.find('input[id*="register-billing"]');

      scope.disableBillAddress = function() {
        billingAddressFields.prop('disabled', sameAsCheckBox.prop('checked'));
      };

      page.on('pagebeforeshow', function() {

        Restangular.one('questions').getList().then(function(questionsList) {
          scope.questions = questionsList;
          Helper.refreshSelect(securityQuestions);
        });

      });

    }
  };
});
