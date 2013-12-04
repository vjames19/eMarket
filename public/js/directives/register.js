'use strict';

angular.module('eMarketApp').directive('register', function(Restangular, Helper) {
  return {
    templateUrl: 'views/register.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Restangular, Patterns) {

      $scope.patternFirstName = Patterns.user.firstName;
      $scope.patternMiddleName = Patterns.user.middleName;
      $scope.patternLastName = Patterns.user.lastName;

      $scope.patternAddress = Patterns.address.street;
      $scope.patternCountry = Patterns.address.country;
      $scope.patternCity = Patterns.address.city;
      $scope.patternGeoRegion = Patterns.address.geoRegion;
      $scope.patternZipCode = Patterns.address.zipCode;
      $scope.patternTelephone = Patterns.address.telephone;

      $scope.patternOwnerName = Patterns.user.fullName;
      $scope.patternExpDate = Patterns.card.expDate;
      $scope.patternNumber = Patterns.card.number;
      $scope.patternCsv = Patterns.card.csv;

      $scope.patternUsername = Patterns.user.username;
      $scope.patternPassword = Patterns.user.password;
      $scope.patternAnswer = Patterns.question.answer;

      $scope.register = { cardType: 'Visa' };

      var page = $($element[0]);

      var statusPopup = page.find('#register-statusPopup');
      var statusPopupMessage = page.find('#register-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off(); // Unbind any previous events
        if($scope.register.password !== $scope.register.passwordConfirm) {
          statusPopupMessage.text('Passwords do not match.');
          statusPopup.popup('open');
          return;
        }
        var questions = [
          $scope.register.securityQuestion1,
          $scope.register.securityQuestion2,
          $scope.register.securityQuestion3
        ];
        if(window._.uniq(questions).length !== 3) {
          statusPopupMessage.text('All three questions must be different.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.register.middleName) {
          $scope.register.middleName = null;
        }
        if(!$scope.register.mailingGeoRegion) {
          $scope.register.mailingGeoRegion = null;
        }
        if(!$scope.register.billingGeoRegion) {
          $scope.register.billingGeoRegion = null;
        }
        if($scope.register.sameAsMailing === true) {
          $scope.register.billingAddress = $scope.register.mailingAddress;
          $scope.register.billingCountry = $scope.register.mailingCountry;
          $scope.register.billingGeoRegion = $scope.register.mailingGeoRegion;
          $scope.register.billingCity = $scope.register.mailingCity;
          $scope.register.billingZipCode = $scope.register.mailingZipCode;
        }
        $scope.register.cardExpDate = $scope.register.cardExpDate + '-01'; // Default Day
        $.mobile.loading('show');
        Restangular.all('../register').post($scope.register).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Registration successful. ' +
              'Your username is ' + $scope.register.username + '. ' +
              'Your password is ' + $scope.register.password + '.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#index-page'); //Force user to put hes newly registered credentials
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Could not Finish Registration. ' +
              'Username or Email might be already registered.');
          statusPopup.popup('open');
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

        Restangular.all('questions').getList().then(function(questionsList) {
          scope.questions = questionsList;
          Helper.refreshSelect(securityQuestions);
        });

      });

    }
  };
});
