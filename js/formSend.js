'use strict';

(function () {
  var MAIN_PIN_HEIGHT_W_POINTER = window.dragpin.MAIN_PIN_HEIGHT_W_POINTER;
  var AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';

  var adForm = window.validation.adForm;
  var backendSave = window.backend.save;
  var mainPin = window.map.mainPin;
  var removeAllCards = window.filter.removeAllCards;
  var errorHandler = window.backendHandlers.errorHandler;
  var setStartCoordsMainPin = window.backendHandlers.setStartCoordsMainPin;
  var successHandler = window.backendHandlers.successHandler;
  var setStartStateOfPage = window.setup.setStartStateOfPage;
  var activateForm = window.setup.activateForm;
  var activateHeaderForm = window.setup.activateHeaderForm;
  var onTypeFilterChange = window.filter.onTypeFilterChange;
  var clearMap = window.setup.clearMap;
  var debounce = window.util.debounce;

  var resetButton = document.querySelector('.ad-form__reset');

  var cleanPinsAndCards = function () {
    var mapPins = document.querySelector('.map__pins');
    var mapPinsCollection = document.querySelectorAll('.map__pin');
    mapPinsCollection.forEach(function (item) {
      mapPins.removeChild(item);
    });
    removeAllCards();
    mapPins.appendChild(mainPin);
  };

  var cleanPhotos = function () {
    var previewAvatarPhoto = document.querySelector('.ad-form-header__preview');
    var previewAdvertPhoto = document.querySelectorAll('.ad-form__photo');

    var avatar = previewAvatarPhoto.querySelector('img');
    avatar.src = AVATAR_DEFAULT_SRC;

    previewAdvertPhoto.forEach(function (item, index) {
      if (index === 0) {
        item.innerHTML = '';
      } else {
        item.remove();
      }
    });
  };

  var successLoad = function () {
    cleanPinsAndCards();
    successHandler();
  };

  var onMainPinClick = function () {
    activateForm();
    activateHeaderForm();
    debounce(onTypeFilterChange);
    clearMap();
    setStartCoordsMainPin(MAIN_PIN_HEIGHT_W_POINTER);
    mainPin.removeEventListener('click', onMainPinClick);
  };

  var resetForm = function () {
    adForm.reset();
    document.querySelector('.map__filters').reset();
    setStartStateOfPage();
    cleanPinsAndCards();
    setStartCoordsMainPin(0);
    cleanPhotos();
    mainPin.addEventListener('click', onMainPinClick);
  };

  var onFormSubmitData = function (evt) {
    backendSave(new FormData(adForm), successLoad, errorHandler);
    evt.preventDefault();
    setStartStateOfPage();
    resetForm();
  };
  adForm.addEventListener('submit', onFormSubmitData);
  resetButton.addEventListener('click', resetForm);
})();
