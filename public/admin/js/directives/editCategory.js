'use strict';

angular.module('eMarketApp').directive('editCategory', function(Restangular, CategoryInfo, Helper) {
  return {
    templateUrl: 'views/editCategory.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, Restangular, Patterns) {

      $scope.patternCategoryName = Patterns.category.name;

      $scope.submit = function() {
        $.mobile.loading('show');
        if(!$scope.categoryInfo.categoryParent) {
          $scope.categoryInfo.categoryParent = null;
        }
        if($scope.categoryInfo.categoryName.toLowerCase() !== 'other') {  // Special Category
          Restangular.one('categories', $scope.categoryInfo.id).customPUT($scope.categoryInfo)
              .then(function(categoryInfo) {
                $scope.categoryInfo = categoryInfo;
                $.mobile.loading('hide');
                $.mobile.changePage('#categories-admin');
              }, function(err) {
                $.mobile.loading('hide');
                alert('Update Not Successful.');
                console.log('Update Category failed: ', err);
                $.mobile.changePage('#categories-admin');
              });
        } else {
          $.mobile.loading('hide');
          $.mobile.changePage('#categories-admin');
        }
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

    }
  };
});

