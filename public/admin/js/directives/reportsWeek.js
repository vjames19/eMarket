'use strict';

angular.module('eMarketApp').directive('reportsWeek', function(Restangular, Report, Helper) {
  return {
    templateUrl: 'views/reportsWeek.html',
    restrict: 'E',
    scope: {},
    replace: true,
    link: function(scope, elem, Highcharts) {

      var page = $(elem[0]);
      var graph = page.find('div[id*="graph"]');
      var selectedCategory = page.find('select[id*="selectCategory"]');

      var updateGraph = function(totalSales, totalRevenue) {
        setTimeout(function() {
          graph.highcharts(Report.setGraphOptions(totalSales, totalRevenue, Highcharts));
        });
      };

      var totalSales = 0.0;
      var totalRevenue = 0.0;

      scope.selectedCategory = null;

      var unregisterWatcher = null;

      page.on('pagebeforeshow', function() {

        Restangular.all('categories').getList({flat: true}).then(function(categories) {
          scope.categories = categories;
          Helper.refreshSelect(selectedCategory);
        });

        unregisterWatcher = scope.$watch('selectedCategory', function() {
          if(scope.selectedCategory === null) {
            Restangular.one('reportsWeekTotal').get().then(function(result) {
              totalSales = result.sales;
              totalRevenue = result.revenue;
              updateGraph(totalSales, totalRevenue);
            });
          } else {
            Restangular.one('reportsWeek', scope.selectedCategory).get().then(function(result) {
              totalSales = result.sales;
              totalRevenue = result.revenue;
              updateGraph(totalSales, totalRevenue);
            });
          }
        });

      });

      page.on('pagehide', function() {
        unregisterWatcher();
      });

    }
  };
});

