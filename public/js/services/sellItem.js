'use strict';

angular.module('eMarketApp').factory('SellItem', function() {
  var draft = {};
  var itemPreview = {};
  return {
    setDraft: function(draftItem) {
      draft = angular.copy(draftItem);
    },
    setItemPreview: function(item) {
      itemPreview = angular.copy(item);
    },
    getDraft: function() {
      return draft;
    },
    getItemPreview: function() {
      return itemPreview;
    },
    isDraft: ''
  };
});
