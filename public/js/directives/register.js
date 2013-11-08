'use strict';

angular.module('eMarketApp').directive('register', function(Restangular) {
  return {
    templateUrl: 'views/register.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular) {
      $scope.newUser = { creditCard: {creditCardType: 'Visa'} };

      $scope.submit = function() {
        $.mobile.loading('show');
        Restangular.all('users').post($scope.newUser.user).then(function(user) {
          user.all('mailAddresses').post($scope.newUser.mailAddress);
          user.all('billAddresses').post($scope.newUser.billAddress);
          user.all('creditCards').post($scope.newUser.creditCard);
          $.mobile.loading('hide');
          $.mobile.changePage('#index-user'); //Force user to put hes newly registered credentials
        });
      };

    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var sameAsCheckBox = page.find('#same-as');

      scope.disableBillAddress = function() {
        var disable = sameAsCheckBox.prop('checked');
        page.find('input[id*="billing-address"]').prop('disabled', disable);
      };

      page.on('pagebeforeshow', function() {

        Restangular.one('questions').getList().then(function(questionsList) {
          scope.questions = questionsList;
          setTimeout(function() {
            page.find('select[id*="security-questions"]').selectmenu('refresh', true);
          });
        });

      });
    }
  };
});
