'use strict';

angular.module('eMarketApp').directive('reportsWeek', function(Restangular, Report, Helper) {
  return {
    templateUrl: 'views/reportsWeek.html',
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

      scope.$watch('selectedCategory',
          // listener
          function() {
            if(scope.selectedCategory === null) {
              Restangular.one('reportsWeekTotal').get().then(function(result) {
                scope.totalSales = result[0].sales;
                scope.totalRevenue = result[0].revenue;
                setTimeout(function() {
                  graph.highcharts(Report.setGraphOptions(scope.totalSales, scope.totalRevenue, Highcharts));
                });
              });
            } else {
              Restangular.one('reportsWeek', scope.selectedCategory).get().then(function(result) {
                scope.totalSales = result.sales;
                scope.totalRevenue = result.revenue;
                setTimeout(function() {
                  graph.highcharts(Report.setGraphOptions(scope.totalSales, scope.totalRevenue, Highcharts));
                });
              });
            }
          },

          function(newValue, oldValue) {
            // init
            if(newValue === oldValue) {
              setTimeout(function() {
                graph.highcharts(Report.setGraphOptions(scope.totalSales, scope.totalRevenue, Highcharts));
              });
            }
            // change and no digest running
            else if(!scope.$$phase) {
              scope.$digest();
            }
          }
      );

      page.on('pagebeforeshow', function() {

        Restangular.all('categories').getList({flat: true}).then(function(categories) {
          scope.categories = categories;
          Helper.refreshSelect(selectedCategory);
        });

      });

    }
  };
});

