'use strict';

angular.module('eMarketApp').directive('editCategory', function(Restangular) {
  return {
    templateUrl: 'views/editCategory.html',
    restrict: 'E',
    scope: {
      categoryInfo: '='
    },
    replace: true,
    controller: function($scope, Restangular) {
      $scope.submit = function() {
        if(!$scope.categoryInfo.categoryParent) {
          $scope.categoryInfo.categoryParent = null;
        }
        Restangular.one('categories', $scope.categoryInfo.categoryId).customPUT($scope.categoryInfo)
            .then(function(categoryInfo) {
              $scope.categoryInfo = categoryInfo;
              $.mobile.changePage('#categories-admin');
            }, function(err) {
              alert(err);
            });
      };
    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var categoryAdminList = page.find('#categoryAdminList');
      var categorySelectMenu = page.find('#parent');

      page.on('pagebeforeshow', function() {

        Restangular.all('categories').getList().then(function(categories) {
          scope.categories = categories;
          setTimeout(function() {
            categoryAdminList.listview('refresh');
            categorySelectMenu.selectmenu('refresh');
          });
        });

      });

      page.on('pageshow', function() {
        categoryAdminList.listview('refresh');
        categorySelectMenu.selectmenu('refresh');
      });

    }
  };
});

