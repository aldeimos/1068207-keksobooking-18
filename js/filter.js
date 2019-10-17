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
  var pins = [];

  var filterHouseType = function (item) {
    if (upperHouseFilter.value === DEFAULT_FILTER_VALUE) {
      return true;
    }
    return item.offer.type === upperHouseFilter.value;
  };
  var filterPrice = function (item) {
    if (upperPriceFilter.value === DEFAULT_FILTER_VALUE) {
      return true;
    }
    return priceValidationMap[upperPriceFilter.value](item.offer.price);
  };
  var filterRooms = function (item) {
    if (upperRoomsFilter.value === DEFAULT_FILTER_VALUE) {
      return true;
    }
    return item.offer.rooms === Number(upperRoomsFilter.value);
  };
  var filterGuests = function (item) {
    if (upperGuestsFilter.value === DEFAULT_FILTER_VALUE) {
      return true;
    }
    return item.offer.guests === Number(upperGuestsFilter.value);
  };
  var filterFeatures = function (item) {
    var selectedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked')).map(function (checkbox) {
      return checkbox.value;
    });
    return selectedFeatures.every(function (val) {
      return item.offer.features.includes(val);
    });
  };

  var onTypeFilterChange = function () {
    removeAllCards();
    var filteredPins = pins.filter(filterHouseType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .filter(filterFeatures);
    renderPins(filteredPins);
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
