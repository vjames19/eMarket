'use strict';

angular.module('eMarketApp').directive('profile', function(User, Restangular, Helper) {
  return {
    templateUrl: 'views/profile.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, MailingAddressInfo, BillingAddressInfo, Patterns) {

      $scope.patternFirstName = Patterns.user.firstName;
      $scope.patternMiddleName = Patterns.user.middleName;
      $scope.patternLastName = Patterns.user.lastName;
      $scope.patternTelephone = Patterns.address.telephone;
      $scope.patternPassword = Patterns.user.password;
      $scope.patternAnswer = Patterns.question.answer;

      $scope.setMailInfo = function(mailInfo) {
        angular.copy(mailInfo, MailingAddressInfo.mailInfo);
      };

      $scope.setBillInfo = function(billInfo) {
        angular.copy(billInfo, BillingAddressInfo.billInfo);
      };

      var page = $($element[0]);

      var statusPopup = page.find('#profile-statusPopup');
      var statusPopupMessage = page.find('#profile-statusPopupMessage');

      $scope.submitUser = function() {
        statusPopup.off(); // Unbind any previous events
        if($scope.user.password !== $scope.user.passwordConfirm) {
          statusPopupMessage.text('Passwords do not match.');
          statusPopup.popup('open');
          return;
        }
        var questions = [
          $scope.user.question1,
          $scope.user.question2,
          $scope.user.question3
        ];
        if(window._.uniq(questions).length !== 3) {
          statusPopupMessage.text('All three questions must be different.');
          statusPopup.popup('open');
          return;
        }
        if(!$scope.user.middleName) {
          $scope.user.middleName = null;
        }
        $.mobile.loading('show');
        Restangular.one('users', $scope.user.id).customPUT($scope.user).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Profile Updated Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#home-user');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Could not update Profile Successfully. ' +
              'Email might already exists or Old Password is incorrect.');
          statusPopup.popup('open');
          console.log('Profile Error', err);
        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var ratingList = page.find('#profile-ratingList');
      var mailAddressList = page.find('#profile-mailAddressList');
      var billAddressList = page.find('#profile-billAddressList');
      var questionSelects = page.find('select[id*="profile-securityQuestion"]');

      var statusPopup = page.find('#profile-statusPopup');
      var statusPopupMessage = page.find('#profile-statusPopupMessage');
      var profileMailingPopup = page.find('#profile-mailAddressOptionsPopup');
      var profileBillingPopup = page.find('#profile-billAddressOptionsPopup');

      var deleteMailingButton = page.find('#deleteMailingBtn');
      var deleteBillingButton = page.find('#deleteBillingBtn');

      var selectedMailAddress = null;
      var selectedMailAddressIndex = null;
      var selectedBillAddress = null;
      var selectedBillAddressIndex = null;

      scope.selectMailAddress = function(mailAddress, index) {
        selectedMailAddress = mailAddress;
        selectedMailAddressIndex = index;
      };

      scope.selectBillAddress = function(billAddress, index) {
        selectedBillAddress = billAddress;
        selectedBillAddressIndex = index;
      };

      scope.deleteMailAddress = function() {
        profileMailingPopup.off();
        statusPopup.off();

        if(scope.mailAddresses[selectedMailAddressIndex].isPrimary) {
          profileMailingPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Cannot delete a primary mail address.');
              setTimeout(function() {
                statusPopup.popup('open');
                profileMailingPopup.off();
              });
            }
          });
          return
        }

        profileMailingPopup.off();
        statusPopup.off();
        $.mobile.loading('show');
        User.me().one('mailAddresses', selectedMailAddress.id).remove().then(function() {
          scope.mailAddresses.splice(selectedMailAddressIndex, 1);
          Helper.refreshList(mailAddressList);

          if(scope.mailAddresses.length === 1) {
            deleteMailingButton.addClass('ui-disabled');
          }
          else {
            deleteMailingButton.removeClass('ui-disabled');
          }

          $.mobile.loading('hide');
          profileMailingPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Mailing Address Deleted Successfully.');
              setTimeout(function() {
                statusPopup.popup('open');
                profileMailingPopup.off();
              });
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          profileMailingPopup.on({
            popupafterclose: function() {
              statusPopupMessage.text('Could not delete mailing address.');
              setTimeout(function() {
                statusPopup.popup('open');
                profileMailingPopup.off();
              });
            }
          });
          console.log('Error Removing Mailing Address', err);
        });
      };

      scope.deleteBillAddress = function() {
        profileBillingPopup.off();
        statusPopup.off();
        $.mobile.loading('show');
//        User.me().one('BillAddresses', selectedBillAddress.billAddressId).remove().then(function() {
        scope.billAddresses.splice(selectedBillAddressIndex, 1);
        Helper.refreshList(billAddressList);
        $.mobile.loading('hide');
//        });
      };

      page.on('pagebeforeshow', function() {

        User.me().get().then(function(user) {
          scope.user = user;
        });

        Restangular.all('questions').getList().then(function(questionsList) {

          scope.questions = questionsList;

          User.me().getList('questionsAnswers').then(function(questionsAnswersList) {

            scope.questionsAnswers = questionsAnswersList;

            scope.user.questionAnswer1 = questionsAnswersList[0].answer;
            scope.user.questionAnswer2 = questionsAnswersList[1].answer;
            scope.user.questionAnswer3 = questionsAnswersList[2].answer;

            scope.user.question1 = scope.questions[scope.questionsAnswers[0].id - 1].id;
            scope.user.question2 = scope.questions[scope.questionsAnswers[1].id - 1].id;
            scope.user.question3 = scope.questions[scope.questionsAnswers[2].id - 1].id;

            Helper.refreshSelect(questionSelects);

          });

        });

        User.me().getList('mailAddresses').then(function(mailAddressesList) {
          scope.mailAddresses = mailAddressesList;
          Helper.refreshList(mailAddressList);

          if(scope.mailAddresses.length === 1) {
            deleteMailingButton.addClass('ui-disabled');
          }
          else {
            deleteMailingButton.removeClass('ui-disabled');
          }

        });

        User.me().getList('billAddresses').then(function(billAddressesList) {
          scope.billAddresses = billAddressesList;
          Helper.refreshList(billAddressList);

          if(scope.billAddresses.length === 1) {
            deleteBillingButton.addClass('ui-disabled');
          }
          else {
            deleteBillingButton.removeClass('ui-disabled');
          }
        });

        User.me().one('avgRating').get().then(function(avg) {
          scope.rating = avg;
        });

        User.me().getList('ratings').then(function(ratings) {
          scope.ratings = ratings;
          setTimeout(function() {
            page.find('.star').raty({
              cancel: true,
              score: function() {
                return $(this).attr('data-score');
              },
              half: true,
              size: 12,
              readOnly: true,
              path: '../lib/raty/lib/img'
            });
            Helper.refreshList(ratingList);
          });
        });

      });

    }
  };
});
