'use strict';

(function () {
  var renderPins = window.map.renderPins;
  var removeAllCards = window.formSend.removeAllCards;

  var upperHouseFilter = document.querySelector('#housing-type');
  var pins = [];
  var onTypeFilterChange = function () {
    removeAllCards();
    renderPins(pins.filter(function (item) {
      if (upperHouseFilter.value === 'any') {
        return true;
      }
      return item.offer.type === upperHouseFilter.value;
    }));
  };
  var successHandler = function (array) {
    pins = array;
    onTypeFilterChange();
  };
  upperHouseFilter.addEventListener('change', onTypeFilterChange);
  window.filter = {
    successHandler: successHandler
  };
})();
