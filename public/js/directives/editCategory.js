'use strict';

angular.module('eMarketApp')
    .directive('editCategory', function (Restangular) {
      return {
        templateUrl: 'views/editCategory.html',
        restrict: 'E',
        scope: {
          categoryInfo: '='
        },
        replace: true,
        controller: function ($scope, Restangular) {
          $scope.submit = function () {
            Restangular.one('api/categories', $scope.categoryInfo.categoryId).customPUT($scope.categoryInfo)
                .then(function (categoryInfo) {
                  $scope.categoryInfo = categoryInfo;
                  $.mobile.changePage('#categories-admin');
                }, function (err) {
                  alert(err);
                });
          };
        },
        link: function (scope, elem) {
          var page = $(elem[0]);
          var categoryAdminList = page.find('#categoryAdminList');

          page.on('pagebeforeshow', function () {
            scope.categories = Restangular.all('api/categories').getList();
          });

          page.on('pageshow', function () {
            categoryAdminList.listview('refresh');
          });

        }
      };
    });

