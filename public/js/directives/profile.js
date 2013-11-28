'use strict';

angular.module('eMarketApp').directive('profile', function(User, Restangular, Helper) {
  return {
    templateUrl: 'views/profile.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, MailingAddressInfo, BillingAddressInfo, Patterns) {

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

      $scope.submitUser = function() {
        $.mobile.loading('show');
//        scope.user.customPUT(scope.user, scope.user.userId).then(function() {
        $.mobile.loading('hide');
        $.mobile.changePage('#home-user');
//        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var ratingList = page.find('#profile-ratingList');
      var mailAddressList = page.find('#profile-mailAddressList');
      var billAddressList = page.find('#profile-billAddressList');
      var questionSelects = page.find('select[id*="profile-securityQuestion"]');

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
        $.mobile.loading('show');
//        User.me().one('mailAddresses', selectedMailAddress.mailAddressId).remove().then(function() {
        scope.mailAddresses.splice(selectedMailAddressIndex, 1);
        Helper.refreshList(mailAddressList);
        $.mobile.loading('hide');
//        });
      };

      scope.deleteBillAddress = function() {
        $.mobile.loading('show');
//        User.me().one('BillAddresses', selectedBillAddress.billAddressId).remove().then(function() {
        scope.billAddresses.splice(selectedBillAddressIndex, 1);
        Helper.refreshList(billAddressList);
        $.mobile.loading('hide');
//        });
      };

      page.on('pagebeforeshow', function() {

        var user = User.me();

        user.get().then(function(user) {
          scope.user = user;
        });

        Restangular.one('questions').getList().then(function(questionsList) {

          scope.questions = questionsList;

          user.getList('questionsAnswers').then(function(questionsAnswersList) {

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

        user.getList('mailAddresses').then(function(mailAddressesList) {
          scope.mailAddresses = mailAddressesList;
          Helper.refreshList(mailAddressList);

        });

        user.getList('billAddresses').then(function(billAddressesList) {
          scope.billAddresses = billAddressesList;
          Helper.refreshList(billAddressList);
        });

        user.one('avgRating').get().then(function(avg) {
          scope.rating = avg;
        });

        user.getList('ratings').then(function(ratings) {
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
