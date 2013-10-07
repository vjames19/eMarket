'use strict';

angular.module('eMarketApp')
    .directive('reportsDay', function (Restangular) {
      return {
        templateUrl: 'views/reportsDay.html',
        restrict: 'E',
        scope: {},
        replace: true,
        link: function (scope, elem) {
          var page = $(elem[0]);
          var graph = page.find('#pie');
          var totalRevenue = 0.0;
          var totalSales = 0.0;

          page.on('pagebeforeshow', function () {
            scope.categories = Restangular.all('api/categories').getList();
            Restangular.all('api/admins/1/reports').getList().then(function (results) {
              scope.reports = results;
              window._.each(results, function (report) {
                totalRevenue += report.reportRevenue;
                totalSales += report.reportSales;
              });
            });
          });

          page.on('pageshow', function () {
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

