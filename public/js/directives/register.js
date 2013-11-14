'use strict';

angular.module('eMarketApp').directive('register', function(Restangular, Helper) {
  return {
    templateUrl: 'views/register.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular) {

      $scope.register = { cardType: 'Visa' };

      $scope.submit = function() {
        $.mobile.loading('show');
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
        Restangular.all('../register').post($scope.register).then(function() {
          $.mobile.loading('hide');
          $.mobile.changePage('#index-page'); //Force user to put hes newly registered credentials
        }, function(err) {
          $.mobile.loading('hide');
          alert('Could not Finish Registration.');
          console.log('Registration Error', err);
          $.mobile.changePage('#index-page');
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
