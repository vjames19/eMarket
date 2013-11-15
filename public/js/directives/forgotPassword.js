'use strict';

angular.module('eMarketApp').directive('forgotPassword', function(Restangular, Helper) {
  return {
    templateUrl: 'views/forgotPassword.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element) {

      var page = $($element[0]);

      var changedPopup = page.find('#forgot-changeStatus');
      var changedMessage = page.find('#forgot-changeStatusMessage');

      $scope.submit = function() {
        $.mobile.loading('show');
        Restangular.all('../forgot').post($scope.forgot).then(function() {
          $.mobile.loading('hide');
          changedMessage.text('Password Changed to ' + $scope.forgot.newPassword);
          changedPopup.popup('open');
          changedPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#index-page');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          changedMessage.text('Incorrect Information');
          changedPopup.popup('open');
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

