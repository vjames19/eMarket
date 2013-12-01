'use strict';

angular.module('eMarketApp').directive('addUser', function(Restangular, Helper) {
  return {
    templateUrl: 'views/addUser.html',
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

      // initial value for display
      $scope.addUser = { cardType: 'Visa' };

      var page = $($element[0]);

      var statusPopup = page.find('#addUser-statusPopup');
      var statusPopupMessage = page.find('#addUser-statusPopupMessage');

      $scope.submit = function() {
        if($scope.addUser.password !== $scope.addUser.passwordConfirm) {
          statusPopupMessage.text('Passwords do not match.');
          statusPopup.popup('open');
          return;
        }
        var questions = [
          $scope.addUser.securityQuestion1,
          $scope.addUser.securityQuestion2,
          $scope.addUser.securityQuestion3
        ];
        if(window._.uniq(questions).length !== 3) {
          statusPopupMessage.text('All three questions must be different.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.addUser.middleName) {
          $scope.addUser.middleName = null;
        }
        if(!$scope.addUser.mailingGeoRegion) {
          $scope.addUser.mailingGeoRegion = null;
        }
        if(!$scope.addUser.billingGeoRegion) {
          $scope.addUser.billingGeoRegion = null;
        }
        if($scope.addUser.sameAsMailing === true) {
          $scope.addUser.billingAddress = $scope.addUser.mailingAddress;
          $scope.addUser.billingCountry = $scope.addUser.mailingCountry;
          $scope.addUser.billingGeoRegion = $scope.addUser.mailingGeoRegion;
          $scope.addUser.billingCity = $scope.addUser.mailingCity;
          $scope.addUser.billingZipCode = $scope.addUser.mailingZipCode;
        }
        $scope.addUser.cardExpDate = $scope.addUser.cardExpDate + '-01'; // Default Day
        $.mobile.loading('show');
        Restangular.all('../register').post($scope.addUser).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Registration successful. ' +
              'The username is ' + $scope.addUser.username + '. ' +
              'The password is ' + $scope.addUser.password + '.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#user-accounts'); //Force user to put hes newly registered credentials
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Could not Finish Registration. ' +
              'Username or Email might be already registered.');
          statusPopup.popup('open');
          console.log('AddUser Error', err);
        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var sameAsCheckBox = page.find('#addUser-sameAsMailing');
      var securityQuestions = page.find('select[id*="addUser-securityQuestion"]');
      var billingAddressFields = page.find('input[id*="addUser-billing"]');

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

