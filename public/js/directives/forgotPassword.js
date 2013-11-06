'use strict';

angular.module('eMarketApp').directive('forgotPassword', function(Restangular) {
  return {
    templateUrl: 'views/forgotPassword.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem) {
      var page = $(elem[0]);

      page.on('pagebeforeshow', function() {

        Restangular.one('questions').getList().then(function(questionsList) {
          scope.questions = questionsList;
        });
      });

    }
  };
});

