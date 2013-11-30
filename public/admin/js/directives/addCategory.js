'use strict';

angular.module('eMarketApp').directive('addCategory', function(Restangular, Helper) {
  return {
    templateUrl: 'views/addCategory.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $element, Restangular, Patterns) {

      $scope.patternCategoryName = Patterns.category.name;

      var page = $($element[0]);

      var statusPopup = page.find('#addCategory-statusPopup');
      var statusPopupMessage = page.find('#addCategory-statusPopupMessage');

      $scope.submit = function() {
        $.mobile.loading('show');
        if(!$scope.addCategory.categoryParent) {
          $scope.addCategory.categoryParent = null;
        }
        if($scope.addCategory.categoryName.toLowerCase() === 'other') { // Special Category
          $.mobile.loading('hide');
          statusPopupMessage.text('Category name cannot be \'other\'.');
          statusPopup.popup('open');
          return;
        }
        Restangular.all('categories').post($scope.addCategory).then(function() {
          $.mobile.loading('hide');
          statusPopupMessage.text('Category Added Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#categories-admin');
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          statusPopupMessage.text('Category not Added Successfully.');
          statusPopup.popup('open');
          statusPopup.on({
            popupafterclose: function() {
              $.mobile.changePage('#categories-admin');
            }
          });
          console.log('Create Category failed: ', err);
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

