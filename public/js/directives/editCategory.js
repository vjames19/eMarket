'use strict';

angular.module('eMarketApp')
    .directive('editCategory', function () {
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
        }
      };
    });

