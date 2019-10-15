'use strict';

(function () {
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var MAIN_PIN_HEIGHT_W_POINTER = window.dragpin.MAIN_PIN_HEIGHT_W_POINTER;

  var adForm = window.validation.adForm;
  var backendSave = window.backend.save;
  var mainPin = window.map.mainPin;
  var fillAddressField = window.dragpin.fillAddressField;

  var mainPinX = mainPin.style.left;
  var mainPinY = mainPin.style.top;
  var main = document.querySelector('main');

  var errorPopupHandlerFrame = function () {
    var errorPopup = main.querySelector('.error');
    main.removeChild(errorPopup);
    document.removeEventListener('click', onClickErrorPopupClose);
    document.removeEventListener('keydown', onEscErrorPopupClose);
  };

  var successPopupHandlerFrame = function () {
    var successPopup = main.querySelector('.success');
    main.removeChild(successPopup);
    document.removeEventListener('click', onClickSuccessPopupClose);
    document.removeEventListener('keydown', onEscSuccessPopupClose);
  };

  var onClickErrorPopupClose = function () {
    errorPopupHandlerFrame();
  };
  var onEscErrorPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      errorPopupHandlerFrame();
    }
  };

  var onClickSuccessPopupClose = function () {
    successPopupHandlerFrame();
  };
  var onEscSuccessPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      successPopupHandlerFrame();
    }
  };


  var setStartCoordsMainPin = function () {
    mainPin.style.left = mainPinX;
    mainPin.style.top = mainPinY;
    fillAddressField(MAIN_PIN_HEIGHT_W_POINTER);
  };

  var successHandler = function () {
    var successPlace = document.querySelector('#success').content.cloneNode(true);
    main.appendChild(successPlace);
    document.addEventListener('keydown', onEscSuccessPopupClose);
    document.addEventListener('click', onClickSuccessPopupClose);
    document.removeEventListener('keydown', onEscErrorPopupClose);
    document.removeEventListener('click', onClickErrorPopupClose);
  };

  var errorHandler = function (errorMessage) {
    var errorPlace = document.querySelector('#error').content.cloneNode(true);
    errorPlace.querySelector('.error__message').textContent = errorMessage;
    document.addEventListener('keydown', onEscErrorPopupClose);
    document.addEventListener('click', onClickErrorPopupClose);
    main.appendChild(errorPlace);
    setStartCoordsMainPin();
  };

  var removeAllCards = function () {
    var map = document.querySelector('.map');
    var mapCardCollection = document.querySelectorAll('.map__card');
    mapCardCollection.forEach(function (item) {
      map.removeChild(item);
    });
  };

  var successLoad = function () {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsCollection = document.querySelectorAll('.map__pin');
    mapPinsCollection.forEach(function (item) {
      mapPins.removeChild(item);
    });
    removeAllCards();
    mapPins.appendChild(mainPin);
    setStartCoordsMainPin();
    successHandler();
  };

  var onFormSubmitData = function (evt) {
    backendSave(new FormData(adForm), successLoad, errorHandler);
    evt.preventDefault();
    adForm.reset();
  };
  adForm.addEventListener('submit', onFormSubmitData);
  window.formSend = {
    errorHandler: errorHandler,
    removeAllCards: removeAllCards
  };
})();
