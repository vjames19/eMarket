'use strict';

angular.module('eMarketApp').directive('profile', function(User) {
  return {
    templateUrl: 'views/profile.html',
    restrict: 'E',
    scope: true,
    replace: true,
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

      scope.questions = [
        'What was your childhood nickname?',
        'What is the name of your favorite childhood friend?',
        'Where were you when you had your first kiss?',
        'In what city does your nearest sibling live?',
        'What is your maternal grandmother\'s maiden name?',
        'In what city or town was your first job?',
        'What was your dream job as a child?',
        'What is the name of the company of your first job?',
        'Who was your childhood hero?'
      ];

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

        user.getList('questionsAnswers').then(function(questionsAnswersList) {
          scope.questionsAnswers = questionsAnswersList;

          scope.question1 = scope.questions[scope.questionsAnswers[0].id - 1];
          scope.question2 = scope.questions[scope.questionsAnswers[1].id - 1];
          scope.question3 = scope.questions[scope.questionsAnswers[2].id - 1];

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

        user.getList('ratings').then(function(ratings) {
          scope.ratings = ratings;
          setTimeout(function() {
            page.find('.star').raty({
              cancel: true,
              score: function() {
                return $(this).attr('data-score');
              },
              half: true,
              size: 10,
              path: '../lib/raty/lib/img'
            });
            ratingList.listview('refresh');
          });
        });


        scope.getStars = function(ratingValue) {
          var stars = '';
          for(var i = 0; i < ratingValue; i++) {
            stars += '*';
          }
          return stars;
        };

      });
    }
  };
});
