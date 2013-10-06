'use strict';

angular.module('eMarketApp')
    .directive('reportsMonth', function () {
      return {
        templateUrl: 'views/reportsMonth.html',
        restrict: 'E',
        scope: {},
        replace: true,
        link: function (scope, elem) {
          $(elem[0]).find('#pie').highcharts({
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
                  ['Sales', 45.0],
                  ['Revenue', 26.8]
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
        }
      };
    });

