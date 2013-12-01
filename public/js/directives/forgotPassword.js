'use strict';

angular.module('eMarketApp').directive('forgotPassword', function(Restangular, Helper) {
  return {
    templateUrl: 'views/forgotPassword.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Patterns) {

      $scope.patternUsername = Patterns.user.username;
      $scope.patternPassword = Patterns.user.password;
      $scope.patternAnswer = Patterns.question.answer;

      var page = $($element[0]);

      var statusPopup = page.find('#forgot-statusPopup');
      var statusPopupMessage = page.find('#forgot-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off(); // Unbind any previous events
        var questions = [$scope.forgot.question1, $scope.forgot.question2, $scope.forgot.question3];
        if(window._.uniq(questions).length !== 3) {
          statusPopupMessage.text('All three questions must be different.');
          statusPopup.popup('open');
          return;
        }
        if($scope.forgot.newPassword !== $scope.forgot.newPasswordConfirm) {
          statusPopupMessage.text('Passwords do not match.');
          statusPopup.popup('open');
          return;
        }
        $.mobile.loading('show');
        Restangular.all('../forgot').post($scope.forgot).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Password Changed to ' + $scope.forgot.newPassword);
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#index-page');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('User not found with the information given.');
          statusPopup.popup('open');
          console.log(err);
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

