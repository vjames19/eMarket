'use strict';

angular.module('eMarketApp')
    .directive('addCategory', function (Restangular) {
      return {
        templateUrl: 'views/addCategory.html',
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function ($scope, Restangular) {
          $scope.submit = function () {
            if(!$scope.addCategory.categoryParent){
              $scope.addCategory.categoryParent = null;
            }
            Restangular.all('api/categories').post($scope.addCategory);
            $.mobile.changePage('#categories-admin', {transition: 'fade'});
          };
        },
        link: function (scope, elem) {
          var page = $(elem[0]);

          page.on('pagebeforeshow', function () {
            scope.categories = Restangular.all('api/categories').getList();
          });

        }
      };
    });

