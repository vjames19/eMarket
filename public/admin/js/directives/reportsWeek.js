'use strict';

angular.module('eMarketApp')
    .directive('reportsWeek', function(Restangular) {
      return {
        templateUrl: 'views/reportsWeek.html',
        restrict: 'E',
        scope: {},
        replace: true,
        link: function(scope, elem) {
          var page = $(elem[0]);
          var graph = page.find('#pie');
          var totalRevenue = 0.0;
          var totalSales = 0.0;
          scope.reports = {};
          scope.reports.totals = {};

          page.on('pagebeforeshow', function() {

            Restangular.all('categories').getList({flat: true}).then(function(categories) {
              scope.categories = categories;
            });
            Restangular.all('reportsWeek').getList().then(function(results) {
//              console.log('reports: ', JSON.stringify(results));
              scope.reports = results;
            });
            Restangular.one('reportsWeekTotal').get().then(function(result) {
//              console.log('totals: ', JSON.stringify(result));
              scope.reportTotals = result[0];
              if(scope.reportTotals.sales >= 0 && scope.reportTotals.revenue >= 0) {
                totalSales = scope.reportTotals.sales;
                totalRevenue = scope.reportTotals.revenue;
              }
            });

          });

          page.on('pageshow', function() {
            graph.highcharts({
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                width: $.mobile.window.innerWidth() - 30, ///300,
                height: $.mobile.window.innerHeight() / 1.75 //250
              },
              title: {
                text: 'Sales and Revenue'
              },
              tooltip: {
                enabled: false
              },
              plotOptions: {
                pie: {
                  allowPointSelect: true,
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br/>${y:.1f}'
                  }
                }
              },
              series: [
                {
                  type: 'pie',
                  name: 'Result',
                  data: [
                    ['Sales', totalSales],
                    ['Revenue', totalRevenue]
                  ]
                }
              ],
              exporting: {
                enabled: false
              },
              credits: {
                enabled: false
              }
            });
          });
        }
      };
    });

