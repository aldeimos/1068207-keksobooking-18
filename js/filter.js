'use strict';

(function () {
  var renderPins = window.map.renderPins;
  var removeAllCards = window.formSend.removeAllCards;

  var upperHouseFilter = document.querySelector('#housing-type');
  var pins = [];
  var updateMap = function () {
    renderPins(pins.filter(function (item) {
      removeAllCards();
      if (upperHouseFilter.value === 'any') {
        return item;
      }
      return item.offer.type === upperHouseFilter.value;
    }));
  };
  var successHandler = function (array) {
    pins = array; // каким образом мне удается закинуть переменную pins в функцию updateMap?
    updateMap();
  };
  upperHouseFilter.addEventListener('change', updateMap);
  window.filter = {
    successHandler: successHandler
  };
})();
