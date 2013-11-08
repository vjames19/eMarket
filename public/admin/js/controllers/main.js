'use strict';

angular.module('eMarketApp').controller('MainCtrl', function($scope, Auth) {
  $scope.logIn = function() {
    // TODO: Uncomment for real auth!!!!!
//        Auth.logIn({username: $scope.username, password: $scope.password});
    Auth.logIn({username: 'stuxnet', password: 'stuxnet_pwd'});
    $scope.username = '';
    $scope.password = '';
  };

  // Admins Controllers
  $scope.adminInfoToBeViewed = null;
  $scope.userInfoToBeViewed = null;
  $scope.categoryInfoToBeViewed = null;

  $scope.setAdminInfo = function(adminInfo) {
    $scope.adminInfoToBeViewed = angular.copy(adminInfo);
  };

  $scope.setUserInfo = function(userInfo) {
    $scope.userInfoToBeViewed = angular.copy(userInfo);
  };

  $scope.setCategoryInfo = function(categoryInfo) {
    $scope.categoryInfoToBeViewed = angular.copy(categoryInfo);
  };

  $scope.refreshList = function(listSelector, noTimeOut) {
    if(!noTimeOut) {
      setTimeout(function() {
        listSelector.listview('refresh');
      });
    } else {
      listSelector.listview('refresh');
    }
  };

  $scope.refreshSelect = function(selectSelector, noTimeOut) {
    if(!noTimeOut) {
      setTimeout(function() {
        selectSelector.selectmenu('refresh');
      });
    } else {
      selectSelector.selectmenu('refresh');
    }
  };

  $scope.refreshCheckBoxRadio = function(checkBoxOrRadioSelector, noTimeOut) {
    if(!noTimeOut) {
      setTimeout(function() {
        checkBoxOrRadioSelector.checkboxradio('refresh');
      });
    } else {
      checkBoxOrRadioSelector.checkboxradio('refresh');
    }
  };

  $scope.recreatePage = function(page, noTimeOut) {
    if(!noTimeOut) {
      setTimeout(function() {
        page.trigger('create');
      });
    } else {
      page.trigger('create');
    }
  };

  $scope.setGraphOptions = function(sales, revenue, Highcharts) {
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
  };

});
