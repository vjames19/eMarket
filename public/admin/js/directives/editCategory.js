'use strict';

angular.module('eMarketApp').directive('editCategory', function(Restangular, CategoryInfo, Helper) {
  return {
    templateUrl: 'views/editCategory.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Restangular, Patterns) {

      $scope.patternCategoryName = Patterns.category.name;

      var page = $($element[0]);

      var statusPopup = page.find('#editCategory-statusPopup');
      var statusPopupMessage = page.find('#editCategory-statusPopupMessage');

      $scope.submit = function() {
        statusPopup.off(); // Unbind any previous events
        if(!$scope.categoryInfo.categoryParent) {
          $scope.categoryInfo.categoryParent = null;
        }
        if($scope.categoryInfo.categoryName.toLowerCase() === 'other') { // Special Category
          $.mobile.loading('hide');
          statusPopupMessage.text('Category name cannot be \'other\'.');
          statusPopup.popup('open');
          return;
        }
        var id = $scope.categoryInfo.id; // To Avoid Wrapping xD
        $.mobile.loading('show');
        Restangular.one('categories', id).customPUT($scope.categoryInfo).then(function(categoryInfo) {
          $scope.categoryInfo = categoryInfo;
          $.mobile.loading('hide');
          statusPopupMessage.text('Category Updated Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#categories-admin');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Category not Updated Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#categories-admin');
            }
          });
          console.log('Update Category failed: ', err);
        });
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

