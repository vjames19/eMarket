'use strict';

angular.module('eMarketApp').factory('Report', function() {
  return {
    setGraphOptions: function(sales, revenue, Highcharts) {
      if(isNaN(sales) || isNaN(revenue)) {
        sales = 0.0;
        revenue = 0.0;
      }
      return {
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
            data: [sales]
          },
          {
            name: 'Revenue',
            data: [revenue]
          }
        ]
      };
    }
  };
});
