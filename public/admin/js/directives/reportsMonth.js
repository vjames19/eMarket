'use strict';

angular.module('eMarketApp')
    .directive('reportsMonth', function(Restangular) {
      return {
        templateUrl: 'views/reportsMonth.html',
        restrict: 'E',
        scope: {},
        replace: true,
        link: function(scope, elem) {
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
                if(!isNaN(scope.reportTotals.sales) && !isNaN(scope.reportTotals.revenue)) {
                  totalSales = scope.reportTotals.sales;
                  totalRevenue = scope.reportTotals.revenue;
                  graph.series[0].setData([totalSales]);
                  graph.series[1].setData([totalRevenue]);
                  graph.redraw();
                }
              });
            } else {
              Restangular.one('reportsMonth', [scope.selectedCategory]).get().then(function(result) {
                scope.reportTotals = result;
                if(!isNaN(scope.reportTotals.sales) && !isNaN(scope.reportTotals.revenue)) {
                  totalSales = scope.reportTotals.sales;
                  totalRevenue = scope.reportTotals.revenue;
                  graph.series[0].setData([totalSales]);
                  graph.series[1].setData([totalRevenue]);
                  graph.redraw();
                }
              });
            }

          });

          page.on('pagebeforeshow', function() {

            Restangular.all('categories').getList({flat: true}).then(function(categories) {
              scope.categories = categories;
              setTimeout(function() {
                selectedCategory.selectmenu('refresh', true);
              });
            });

          });

          page.on('pageshow', function() {
            graph.highcharts({
              chart: {
                type: 'column',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                width: $.mobile.window.innerWidth() - 30, ///300,
                height: $.mobile.window.innerHeight() / 1.75 //250
              },
              title: {
                text: 'Sales and Revenue'
              },
              xAxis: {
                categories: ['Sales and Revenue']
              },
              yAxis: {
                title: {
                  text: 'Amount (USD)'
                }
              },
              tooltip: {
                formatter: function() {
                  var number = Highcharts.numberFormat(this.y, 2);
                  if(this.y >= 0) {
                    return '<b>' + this.series.name + '</b>: $' + number;
                  } else {
                    number = number.replace('-', '-$');
                    return '<b>' + this.series.name + '</b>: ' + number;
                  }
                }
              },
              exporting: {
                enabled: false
              },
              credits: {
                enabled: false
              },
              series: [
                {
                  name: 'Sales',
                  data: [totalSales]
                },
                {
                  name: 'Revenue',
                  data: [totalRevenue]
                }
              ]
            });
          });

//          page.on('pageshow', function() {
//            graph.highcharts({
//              chart: {
//                plotBackgroundColor: null,
//                plotBorderWidth: null,
//                plotShadow: false,
//                width: $.mobile.window.innerWidth() - 30, ///300,
//                height: $.mobile.window.innerHeight() / 1.75 //250
//              },
//              title: {
//                text: 'Sales and Revenue'
//              },
//              tooltip: {
//                enabled: false
//              },
//              plotOptions: {
//                pie: {
//                  allowPointSelect: true,
//                  dataLabels: {
//                    enabled: true,
//                    format: '<b>{point.name}</b><br/>${y:.1f}'
//                  }
//                }
//              },
//              series: [
//                {
//                  type: 'pie',
//                  name: 'Result',
//                  data: [
//                    ['Sales', totalSales],
//                    ['Revenue', totalRevenue]
//                  ]
//                }
//              ],
//              exporting: {
//                enabled: false
//              },
//              credits: {
//                enabled: false
//              }
//            });
//          });

          scope.$digest();

        }
      };
    });

