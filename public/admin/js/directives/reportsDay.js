'use strict';

angular.module('eMarketApp').directive('reportsDay', function(Restangular, Report, Helper) {
  return {
    templateUrl: 'views/reportsDay.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem, Highcharts) {

      var page = $(elem[0]);
      var graph = page.find('#graph');
      var selectedCategory = page.find('#select-category');

      scope.totalSales = 0.0;
      scope.totalRevenue = 0.0;
      scope.selectedCategory = null;

      scope.$watch('selectedCategory', function() {

        if(scope.selectedCategory === null) {
          Restangular.one('reportsDayTotal').get().then(function(result) {
            scope.totalSales = result[0].sales;
            scope.totalRevenue = result[0].revenue;
            setTimeout(function() {
              graph.highcharts(Report.setGraphOptions(scope.totalSales, scope.totalRevenue, Highcharts));
            });
          });
        } else {
          Restangular.one('reportsDay', scope.selectedCategory).get().then(function(result) {
            scope.totalSales = result.sales;
            scope.totalRevenue = result.revenue;
            setTimeout(function() {
              graph.highcharts(Report.setGraphOptions(scope.totalSales, scope.totalRevenue, Highcharts));
            });
          });
        }

      });

      page.on('pagebeforeshow', function() {

        Restangular.all('categories').getList({flat: true}).then(function(categories) {
          scope.categories = categories;
          Helper.refreshSelect(selectedCategory);
        });

      });

      scope.$digest();

    }
  };
});

