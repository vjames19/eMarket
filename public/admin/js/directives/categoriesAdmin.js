'use strict';

angular.module('eMarketApp').directive('categoriesAdmin', function(Restangular, Helper) {
  return {
    templateUrl: 'views/categoriesAdmin.html',
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, CategoryInfo) {

      $scope.setCategoryInfo = function(categoryInfo) {
        CategoryInfo.categoryInfo = angular.copy(categoryInfo);
      };

    },
    link: function(scope, elem) {

      var page = $(elem[0]);
      var categoryAdminList = page.find('#categories-categoryAdminList');
      var noMore = page.find('#category-noMoreCategories');

      var optionMenu = page.find('#categories-categoryOptionMenu');
      var statusPopup = page.find('#categories-statusPopup');
      var statusPopupMessage = page.find('#categories-statusPopupMessage');

      var upButton = page.find('#categories-upBtn');
      var stack = [];

      var selectedCategory = null;
      var selectedIndex = null;

      page.on('pagebeforeshow', function() {
        stack = [];
        upButton.hide();
        Restangular.all('categories').getList().then(function(categories) {
          scope.categories = categories;
          stack.push(categories);
          Helper.refreshList(categoryAdminList);
        });
      });

      var refreshCatList = function(categories) {
        scope.categories = categories;
        Helper.refreshList(categoryAdminList);
      };

      scope.next = function(category) {
        if(angular.isArray(category.categories)) {
          upButton.show();
          stack.push(category.categories);
          refreshCatList(category.categories);
        } else {
          noMore.popup('open');
        }
      };

      scope.prev = function() {
        stack.pop();
        if(stack.length <= 1) {
          upButton.hide();
        }
        refreshCatList(window._.last(stack));
      };

      scope.selectedCategory = function(category, index) {
        selectedCategory = category;
        selectedIndex = index;
      };

      scope.deleteCategory = function() {
        $.mobile.loading('show');
        if(selectedCategory.categoryName.toLowerCase() === 'other') { // Special Category
          $.mobile.loading('hide');
          optionMenu.on({
            popupafterclose: function() {
              statusPopupMessage.text('Category \'other\' cannot be deleted.');
              setTimeout(function() {
                statusPopup.popup('open');
              });
            }
          });
          return;
        }
        Restangular.one('categories', selectedCategory.id).remove().then(function() {
          scope.categories.splice(selectedIndex, 1);
          Helper.refreshList(categoryAdminList);
          $.mobile.loading('hide');
          optionMenu.on({
            popupafterclose: function() {
              statusPopupMessage.text('Category deleted successfully.');
              setTimeout(function() {
                statusPopup.popup('open');
              });
            }
          });
        }, function(err) {
          $.mobile.loading('hide');
          optionMenu.on({
            popupafterclose: function() {
              statusPopupMessage.text('Category not deleted successfully.');
              setTimeout(function() {
                statusPopup.popup('open');
              });
            }
          });
          console.log('Error Removing Category', err);
        });
      };

    }
  };
});

