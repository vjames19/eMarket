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
        Restangular.all('../forgot').post($scope.forgot).then(function() {
          $.mobile.loading('hide');
          alert('Password Changed.');
          $.mobile.changePage('#index-page');
        }, function(err) {
          $.mobile.loading('hide');
          alert('Incorrect Information.');
          console.log(err);
          $.mobile.changePage('#index-page');
        });
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

