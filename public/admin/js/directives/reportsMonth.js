'use strict';

angular.module('eMarketApp').directive('reportsMonth', function(Restangular) {
  return {
    templateUrl: 'views/reportsMonth.html',
    restrict: 'E',
    scope: true,
    replace: true,
    link: function(scope, elem, Highcharts) {

      var page = $(elem[0]);
      var graph = page.find('#graph');
      var selectedCategory = page.find('#select-category');
      var totalRevenue = 0.0;
      var totalSales = 0.0;
      scope.selectedCategory = null;

      scope.$watch('selectedCategory', function() {

        scope.reportTotals = {sales: 0.0, revenue: 0.0};

        if(scope.selectedCategory === null) {
          Restangular.one('reportsMonthTotal').get().then(function(result) {
            scope.reportTotals = result[0];
            totalSales = scope.reportTotals.sales;
            totalRevenue = scope.reportTotals.revenue;
          });
        } else {
          Restangular.one('reportsMonth', [scope.selectedCategory]).get().then(function(result) {
            scope.reportTotals = result;
            totalSales = scope.reportTotals.sales;
            totalRevenue = scope.reportTotals.revenue;
          });
        }

      });

      page.on('pagebeforeshow', function() {

        Restangular.all('categories').getList({flat: true}).then(function(categories) {
          scope.categories = categories;
          scope.refreshSelect(selectedCategory);
        });

      });

      page.on('pageshow', function() {
        graph.highcharts(scope.setGraphOptions(totalSales, totalRevenue, Highcharts));
      });

      scope.$digest();

    }
  };
});

