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
    refreshCheckBoxRadio: function(checkBoxOrRadioSelector, noTimeOut) {
      if(!noTimeOut) {
        setTimeout(function() {
          checkBoxOrRadioSelector.checkboxradio('refresh');
        });
      } else {
        checkBoxOrRadioSelector.checkboxradio('refresh');
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
