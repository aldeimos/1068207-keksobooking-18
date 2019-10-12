'use strict';

(function () {
  var adForm = window.validation.adForm;
  var backendSave = window.backend.save;
  var mainPin = window.map.mainPin;
  var fillAddressField = window.dragpin.fillAddressField;
  var ESC_KEYCODE = window.util.ESC_KEYCODE;
  var MAIN_PIN_HEIGHT_W_POINTER = window.dragpin.MAIN_PIN_HEIGHT_W_POINTER;

  var mainPinX = mainPin.style.left;
  var mainPinY = mainPin.style.top;
  var main = document.querySelector('main');
  /* var errorPopup = main.querySelector('.error');
  main.removeChild(errorPopup); */ // Очень странно работает область видимости. Если я беру данные из глобальных переменных в обработчики событий кликап и кейдауна, но окно с ошибкой возвращает undef


  var onClickErrorPopupClose = function () {
    var errorPopup = main.querySelector('.error'); // поэтому пришлось продублировать пока в двух местах
    main.removeChild(errorPopup);
    document.removeEventListener('click', onClickErrorPopupClose);
    document.removeEventListener('keydown', onEscErrorPopupClose);
  };
  var onEscErrorPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var errorPopup = main.querySelector('.error'); // поэтому пришлось продублировать пока в двух местах
      main.removeChild(errorPopup);
      document.removeEventListener('keydown', onEscErrorPopupClose);
      document.removeEventListener('click', onClickErrorPopupClose);
    }
  };

  var onClickSuccessPopupClose = function () {
    var successPopup = main.querySelector('.success'); // поэтому пришлось продублировать пока в двух местах
    main.removeChild(successPopup);
    document.removeEventListener('click', onClickSuccessPopupClose);
    document.removeEventListener('keydown', onEscSuccessPopupClose);
  };
  var onEscSuccessPopupClose = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      var successPopup = main.querySelector('.success'); // поэтому пришлось продублировать пока в двух местах
      main.removeChild(successPopup);
      document.removeEventListener('keydown', onEscSuccessPopupClose);
      document.removeEventListener('click', onClickSuccessPopupClose);
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

  var successLoad = function () {
    var mapPins = document.querySelector('.map__pins');
    var map = document.querySelector('.map');
    var mapPinsCollection = document.querySelectorAll('.map__pin');
    var mapCardCollection = document.querySelectorAll('.map__card');
    mapPinsCollection.forEach(function (item) {
      mapPins.removeChild(item);
    });
    mapCardCollection.forEach(function (item) {
      map.removeChild(item);
    });
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
    errorHandler: errorHandler
  };
})();
