'use strict';

angular.module('eMarketApp').directive('forgotPassword', function(Restangular, Helper) {
  return {
    templateUrl: 'views/forgotPassword.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope) {

      $scope.submit = function() {
        $.mobile.loading('show');
        // Restangular call goes here.
        $.mobile.loading('hide');
        $.mobile.changePage('#index-page'); // <- TODO: open a popup with his password
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var securityQuestions = page.find('select[id*="forgot-securityQuestion"]');

      page.on('pagebeforeshow', function() {

        Restangular.one('questions').getList().then(function(questionsList) {
          scope.questions = questionsList;
          Helper.refreshSelect(securityQuestions);
        });

      });

    }
  };
});

