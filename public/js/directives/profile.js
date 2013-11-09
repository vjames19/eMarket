'use strict';

angular.module('eMarketApp').directive('profile', function(User, Restangular) {
  return {
    templateUrl: 'views/profile.html',
    restrict: 'E',
    scope: true,
    replace: true,
    controller: function($scope, MailingAddressInfo, BillingAddressInfo) {

      $scope.setMailInfo = function(mailInfo) {
        angular.copy(mailInfo, MailingAddressInfo.mailInfo);
      };

      $scope.setBillInfo = function(billInfo) {
        angular.copy(billInfo, BillingAddressInfo.billInfo);
      };

    },
    link: function(scope, elem) {
      var page = $(elem[0]);
      var mailAddressList = page.find('#mailAddressList');
      var billAddressList = page.find('#billAddressList');
      var ratingList = page.find('#ratingList');
      //      var ratingStars = page.find('.star');
      var selectedMailAddress = null;
      var selectedMailAddressIndex = null;
      var selectedBillAddress = null;
      var selectedBillAddressIndex = null;

      var question1 = page.find('#select-question1');
      var question2 = page.find('#select-question2');
      var question3 = page.find('#select-question3');

      scope.submitUser = function() {
        $.mobile.loading('show');
        scope.user.customPUT(scope.user, scope.user.userId).then(function() {
          $.mobile.loading('hide');
        });
      };

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
        User.me().one('mailAddresses', selectedMailAddress.mailAddressId).remove().then(function() {
          scope.mailAddresses.splice(selectedMailAddressIndex, 1);
          mailAddressList.listview('refresh');
          $.mobile.loading('hide');
        });
      };

      scope.deleteBillAddress = function() {
        $.mobile.loading('show');
        User.me().one('BillAddresses', selectedBillAddress.billAddressId).remove().then(function() {
          scope.billAddresses.splice(selectedBillAddressIndex, 1);
          billAddressList.listview('refresh');
          $.mobile.loading('hide');
        });
      };

      page.on('pagebeforeshow', function() {

        var user = User.me();

        user.get().then(function(user) {
          scope.user = user;
        });

        Restangular.one('questions').getList().then(function(questionsList) {
          scope.questions = questionsList;
        });

        user.getList('questionsAnswers').then(function(questionsAnswersList) {
          scope.questionsAnswers = questionsAnswersList;

          scope.question1 = scope.questions[scope.questionsAnswers[0].id - 1];
          scope.question2 = scope.questions[scope.questionsAnswers[1].id - 1];
          scope.question3 = scope.questions[scope.questionsAnswers[2].id - 1];

          setTimeout(function() {
            question1.selectmenu('refresh', true);
            question2.selectmenu('refresh', true);
            question3.selectmenu('refresh', true);
          });

        });

        user.getList('mailAddresses').then(function(mailAddressesList) {
          scope.mailAddresses = mailAddressesList;
          setTimeout(function() {
            mailAddressList.listview('refresh');
          });
        });

        user.getList('billAddresses').then(function(billAddressesList) {
          scope.billAddresses = billAddressesList;
          setTimeout(function() {
            billAddressList.listview('refresh');
          });
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
            ratingList.listview('refresh');
          });
        });
      });
    }
  };
});
