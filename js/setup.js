'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 62;
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT_W_POINTER = 62 + 22;

  var successHandler = window.filter.successHandler;
  var backendLoad = window.backend.load;
  var fillAddressField = window.dragpin.fillAddressField;
  var activateForm = window.form.activate;
  var activateHeaderForm = window.form.activateHeader;
  var disableMainForm = window.form.disableMain;
  var disableHeaderForm = window.form.disableHeader;
  var mainPin = window.map.mainPin;
  var setValidation = window.validation.setFormChecking;
  var errorHandler = window.backendHandlers.errorHandler;


  var clearMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  var muteMap = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
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
    backendLoad(successHandler, errorHandler);
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
    MAIN_PIN_HEIGHT_W_POINTER: MAIN_PIN_HEIGHT_W_POINTER,
    activatePage: activatePage,
    setStartStateOfPage: setStartStateOfPage,
    activateForm: activateForm,
    activateHeaderForm: activateHeaderForm,
  };
})();
