'use strict';

angular.module('eMarketApp').directive('editCategory', function(Restangular, CategoryInfo, Helper) {
  return {
    templateUrl: 'views/editCategory.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular) {

      $scope.submit = function() {
        $.mobile.loading('show');
//        if(!$scope.categoryInfo.categoryParent) {
//          $scope.categoryInfo.categoryParent = null;
//        }
//        Restangular.one('categories', $scope.categoryInfo.categoryId).customPUT($scope.categoryInfo)
//            .then(function(categoryInfo) {
//              $scope.categoryInfo = categoryInfo;
        $.mobile.loading('hide');
        $.mobile.changePage('#categories-admin');
//            }, function(err) {
//              alert(err);
//            });
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);

      var categorySelectMenu = page.find('#editCategory-parent');

      page.on('pagebeforeshow', function() {

        scope.categoryInfo = CategoryInfo.categoryInfo;

        Restangular.all('categories').getList({flat: true}).then(function(categories) {
          scope.categories = categories;
          Helper.refreshSelect(categorySelectMenu);
        });

      });

//      page.on('pageshow', function() {
//        Helper.refreshList(categoryAdminList, true);
//        Helper.refreshSelect(categorySelectMenu, true);
//      });

    }
  };
});

