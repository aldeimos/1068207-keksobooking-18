'use strict';

(function () {
  var pins = window.data.pins;
  var renderPins = window.map.renderPins;
  var fillAddressField = window.form.fillAddressField;
  var setValidation = window.form.setValidation;
  var activateForm = window.form.activateForm;
  var activateHeaderForm = window.form.activateHeaderForm;
  var disableMainForm = window.form.disableMainForm;
  var disableHeaderForm = window.form.disableHeaderForm;
  var mainPin = window.map.mainPin;

  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT_W_POINTER = 62 + 22;

  var clearMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  var muteMap = function () {
    document.querySelector('.map').classList.add('map--faded');
  };

  var getCoordinatesMainPin = function () {
    var x = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
    var y = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT / 2;
    window.form.fillAddressField().value = x + ', ' + y;
  };
  var setStartStateOfPage = function () {
    disableMainForm();
    disableHeaderForm();
    muteMap();
    getCoordinatesMainPin();
  };
  var activatePage = function () {
    clearMap();
    fillAddressField();
    setValidation();
    renderPins(pins);
    activateForm();
    activateHeaderForm();
    mainPin.removeEventListener('mousedown', activatePage);
    mainPin.removeEventListener('keydown', setActivatePage);
  };

  var setActivatePage = function (evt) {
    if (evt.keyCode === window.util.enterKeycode) {
      activatePage();
    }
  };

  mainPin.addEventListener('mousedown', activatePage);

  mainPin.addEventListener('keydown', setActivatePage);

  setStartStateOfPage();
  window.setup = {
    clearMap: clearMap,
    muteMap: muteMap,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT_W_POINTER: MAIN_PIN_HEIGHT_W_POINTER
  };
})();
