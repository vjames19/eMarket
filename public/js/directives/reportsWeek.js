'use strict';

angular.module('eMarketApp')
    .directive('reportsWeek', function () {
      return {
        templateUrl: 'views/reportsWeek.html',
        restrict: 'E',
        scope: {},
        replace: true,
        link: function (scope, elem) {
          $(elem[0]).find('#pie').highcharts({
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              width: 300,
              height: 250
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
                  format: '<b>{point.name}</b><br/>${point.total:.1f}',
                  distance: -35,
                  color: 'white'
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
            ]
          });
        }
      };
    });

