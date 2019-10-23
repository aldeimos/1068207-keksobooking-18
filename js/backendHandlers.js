'use strict';
(function () {
  var ESC_KEYCODE = window.util.ESC_KEYCODE;

  var fillAddressField = window.dragpin.fillAddressField;

  var main = document.querySelector('main');
  var mainPin = window.map.mainPin;
  var mainPinX = mainPin.style.left;
  var mainPinY = mainPin.style.top;

  var errorPopupHandlerFrame = function () {
    var errorPopup = main.querySelector('.error');
    main.removeChild(errorPopup);
    document.removeEventListener('click', onClickErrorPopupClose);
    document.removeEventListener('keydown', onEscErrorPopupClose);
  };

  var onClickErrorPopupClose = function () {
    errorPopupHandlerFrame();
  };
  var onEscErrorPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      errorPopupHandlerFrame();
    }
  };

  var successPopupHandlerFrame = function () {
    var successPopup = main.querySelector('.success');
    main.removeChild(successPopup);
    document.removeEventListener('click', onClickSuccessPopupClose);
    document.removeEventListener('keydown', onEscSuccessPopupClose);
  };

  var onClickSuccessPopupClose = function () {
    successPopupHandlerFrame();
  };
  var onEscSuccessPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      successPopupHandlerFrame();
    }
  };

  var setStartCoordsMainPin = function (arg) {
    mainPin.style.left = mainPinX;
    mainPin.style.top = mainPinY;
    fillAddressField(arg);
  };

  var errorHandler = function (errorMessage) {
    var errorPlace = document.querySelector('#error').content.cloneNode(true);
    errorPlace.querySelector('.error__message').textContent = errorMessage;
    document.addEventListener('keydown', onEscErrorPopupClose);
    document.addEventListener('click', onClickErrorPopupClose);
    main.appendChild(errorPlace);
    setStartCoordsMainPin();
  };

  var successHandler = function () {
    var successPlace = document.querySelector('#success').content.cloneNode(true);
    main.appendChild(successPlace);
    document.addEventListener('keydown', onEscSuccessPopupClose);
    document.addEventListener('click', onClickSuccessPopupClose);
    document.removeEventListener('keydown', onEscErrorPopupClose);
    document.removeEventListener('click', onClickErrorPopupClose);
  };
  window.backendHandlers = {
    errorHandler: errorHandler,
    successHandler: successHandler,
    setStartCoordsMainPin: setStartCoordsMainPin
  };
})();
