'use strict';

angular.module('eMarketApp').directive('addCategory', function(Restangular, Helper) {
  return {
    templateUrl: 'views/addCategory.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular) {

      $scope.submit = function() {
        $.mobile.loading('show');
        if(!$scope.addCategory.categoryParent) {
          $scope.addCategory.categoryParent = null;
        }
        Restangular.all('categories').post($scope.addCategory).then(function() {
          $.mobile.loading('hide');
          $.mobile.changePage('#categories-admin');
        }, function(err) {
          $.mobile.loading('hide');
          alert('Create Not Successful.');
          console.log('Create Category failed: ', err);
          $.mobile.changePage('#categories-admin');
        });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var categorySelectMenu = page.find('#addCategory-parent');

      page.on('pagebeforeshow', function() {

        Restangular.all('categories').getList({flat: true}).then(function(categories) {
          scope.categories = categories;
          Helper.refreshSelect(categorySelectMenu);
        });

      });

    }
  };
});

