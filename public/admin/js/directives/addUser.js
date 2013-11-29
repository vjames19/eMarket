'use strict';

angular.module('eMarketApp').directive('addUser', function(Restangular, Helper) {
  return {
    templateUrl: 'views/addUser.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular, Patterns) {

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

      $scope.submit = function() {
        $.mobile.loading('show');
//        Restangular.all('users').post($scope.addUser.user).then(function(user) {
//          Restangular.one('users', user.userId).all('mailAddresses').post($scope.addUser.mailAddress);
//          Restangular.one('users', user.userId).all('billAddresses').post($scope.addUser.billAddress);
//          Restangular.one('users', user.userId).all('creditCards').post($scope.addUser.creditCard);
        $.mobile.loading('hide');
        $.mobile.changePage('#user-accounts');
//        });
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

