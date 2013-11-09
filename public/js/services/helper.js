'use strict';

angular.module('eMarketApp').factory('Helper', function() {
  return{
    refreshList: function(listSelector, noTimeOut) {
      if(!noTimeOut) {
        setTimeout(function() {
          listSelector.listview('refresh');
        });
      } else {
        listSelector.listview('refresh');
      }
    },

    refreshSelect: function(selectSelector, noTimeOut) {
      if(!noTimeOut) {
        setTimeout(function() {
          selectSelector.selectmenu('refresh');
        });
      } else {
        selectSelector.selectmenu('refresh');
      }
    },
    refreshCheckBox: function(checkBoxSelector, noTimeOut) {
      if(!noTimeOut) {
        setTimeout(function() {
          checkBoxSelector.checkboxradio('refresh');
        });
      } else {
        checkBoxSelector.checkboxradio('refresh');
      }
    },
    refreshRadio: function(radioSelector, noTimeOut) {
      if(!noTimeOut) {
        setTimeout(function() {
          radioSelector.checkboxradio('refresh');
        });
      } else {
        radioSelector.checkboxradio('refresh');
      }
    },
    recreatePage: function(page, noTimeOut) {
      if(!noTimeOut) {
        setTimeout(function() {
          page.trigger('create');
        });
      } else {
        page.trigger('create');
      }
    }
  };
});
