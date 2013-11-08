'use strict';

angular.module('eMarketApp').directive('addUser', function(Restangular) {
  return {
    templateUrl: 'views/addUser.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular) {
      $scope.addUser = { creditCard: {creditCardType: 'Visa'} };

      $scope.submit = function() {
        $.mobile.loading('show');
        Restangular.all('users').post($scope.addUser.user).then(function(user) {
          Restangular.one('users', user.userId).all('mailAddresses').post($scope.addUser.mailAddress);
          Restangular.one('users', user.userId).all('billAddresses').post($scope.addUser.billAddress);
          Restangular.one('users', user.userId).all('creditCards').post($scope.addUser.creditCard);
          $.mobile.loading('hide');
          $.mobile.changePage('#user-accounts');
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

