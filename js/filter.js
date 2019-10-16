'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var renderPins = window.map.renderPins;
  var removeAllCards = window.formSend.removeAllCards;

  var mapFilters = document.querySelector('.map__filters');
  var upperHouseFilter = document.querySelector('#housing-type');
  var upperPriceFilter = document.querySelector('#housing-price');
  var upperRoomsFilter = document.querySelector('#housing-rooms');
  var upperGuestsFilter = document.querySelector('#housing-guests');

  var priceValidationMap = {
    'low': function (val) {
      return val < 10000;
    },
    'middle': function (val) {
      return val >= 10000 && val <= 50000;
    },
    'high': function (val) {
      return val > 50000;
    }
  };
  var roomsValidationMap = {
    '1': function (val) {
      return val === 1;
    },
    '2': function (val) {
      return val === 2;
    },
    '3': function (val) {
      return val === 3;
    }
  };
  var guestsValidationMap = {
    '0': function (val) {
      return val === 0;
    },
    '1': function (val) {
      return val === 1;
    },
    '2': function (val) {
      return val === 2;
    }
  };
  var pins = [];
  var onTypeFilterChange = function () {
    removeAllCards();
    var filteredArray = pins.filter(function (item) {
      if (upperHouseFilter.value === DEFAULT_FILTER_VALUE) {
        return true;
      }
      return item.offer.type === upperHouseFilter.value;
    }).filter(function (item) {
      if (upperPriceFilter.value === DEFAULT_FILTER_VALUE) {
        return true;
      }
      return priceValidationMap[upperPriceFilter.value](item.offer.price);
    }).filter(function (item) {
      if (upperRoomsFilter.value === DEFAULT_FILTER_VALUE) {
        return true;
      }
      return roomsValidationMap[upperRoomsFilter.value](item.offer.rooms);
    }).filter(function (item) {
      if (upperGuestsFilter.value === DEFAULT_FILTER_VALUE) {
        return true;
      }
      return guestsValidationMap[upperGuestsFilter.value](item.offer.guests);
    }).filter(function (item) {
      var checkedValue = Array.from(document.querySelectorAll('.map__checkbox:checked')).map(function (checkbox) {
        return checkbox.value;
      });
      return checkedValue.every(function (val) {
        return item.offer.features.includes(val);
      });
    });
    renderPins(filteredArray);
  };
  var successHandler = function (array) {
    pins = array;
    onTypeFilterChange();
  };
  mapFilters.addEventListener('change', onTypeFilterChange);
  window.filter = {
    successHandler: successHandler
  };
})();
