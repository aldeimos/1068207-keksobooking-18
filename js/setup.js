'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT_W_POINTER = 62 + 22;

  var pins = window.data.pins;
  var renderPins = window.map.renderPins;
  var fillAddressField = window.dragpin.fillAddressField;
  var activateForm = window.form.activate;
  var activateHeaderForm = window.form.activateHeader;
  var disableMainForm = window.form.disableMain;
  var disableHeaderForm = window.form.disableHeader;
  var mainPin = window.map.mainPin;
  var setValidation = window.validation.setFormChecking;

  var clearMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  var muteMap = function () {
    document.querySelector('.map').classList.add('map--faded');
  };

  var setStartStateOfPage = function () {
    disableMainForm();
    disableHeaderForm();
    muteMap();
    fillAddressField(0);
  };
  var activatePage = function () {
    clearMap();
    setValidation();
    renderPins(pins);
    activateForm();
    activateHeaderForm();
    mainPin.removeEventListener('mousedown', activatePage);
    mainPin.removeEventListener('keydown', setActivatePage);
    fillAddressField(MAIN_PIN_HEIGHT_W_POINTER);
  };

  var setActivatePage = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
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
