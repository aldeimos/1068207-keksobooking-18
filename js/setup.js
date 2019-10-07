'use strict';

(function () {
  window.clearMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };

  window.muteMap = function () {
    document.querySelector('.map').classList.add('map--faded');
  };

  window.pinMain = {
    mainPin: document.querySelector('.map__pin--main'),
    MAIN_PIN_HEIGHT: 62,
    MAIN_PIN_WIDTH: 62,
    MAIN_PIN_HEIGHT_W_POINTER: 62 + 22,
  };

  var getCoordinatesMainPin = function () {
    var x = parseInt(window.pinMain.mainPin.style.left, 10) + window.pinMain.MAIN_PIN_WIDTH / 2;
    var y = parseInt(window.pinMain.mainPin.style.top, 10) + window.pinMain.MAIN_PIN_HEIGHT / 2;
    window.formFunctions.fillAddressField().value = x + ', ' + y;
  };
  window.setStartStateOfPage = function () {
    window.formFunctions.disableMainForm();
    window.formFunctions.disableHeaderForm();
    window.muteMap();
    getCoordinatesMainPin();
  };
  window.activatePage = function () {
    window.clearMap();
    window.formFunctions.fillAddressField();
    window.formFunctions.setValidation();
    window.renderPins(window.pins);
    window.formFunctions.activateForm();
    window.formFunctions.activateHeaderForm();
    window.pinMain.mainPin.removeEventListener('mousedown', window.activatePage);
    window.pinMain.mainPin.removeEventListener('keydown', window.setActivatePage);
  };

  window.setActivatePage = function (evt) {
    if (evt.keyCode === window.keyCodes.enterKeycode) {
      window.activatePage();
    }
  };

  window.pinMain.mainPin.addEventListener('mousedown', window.activatePage);

  window.pinMain.mainPin.addEventListener('keydown', window.setActivatePage);
  window.setStartStateOfPage();
})();
