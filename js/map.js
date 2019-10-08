'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT_W_POINTER = 62 + 22;

  var offerTypes = window.data.offerTypes;
  var ESC_KEYCODE = window.util.escKeycode;

  var addressField = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');

  var onButtonCloseClick = function () {
    var buttons = document.querySelectorAll('.popup__close');
    buttons.forEach(function (item) {
      item.parentElement.remove();
    });
    document.removeEventListener('keydown', onEscClosePopup);
  };
  var onEscClosePopup = function (evt) {
    var buttons = document.querySelectorAll('.popup__close');
    buttons.forEach(function (item) {
      if (evt.keyCode === ESC_KEYCODE) {
        item.parentElement.remove();
        document.removeEventListener('keydown', onEscClosePopup);
      }
    });
  };

  var fillAddressField = function (pinPointer) {
    addressField.value = (parseInt(mainPin.style.top, 10) + pinPointer) + ', ' + (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2);
    return addressField;
  };

  var getPin = function (props) { // в качестве аргумента элемент (объект) массива pins
    var pinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin').cloneNode(true);
    pinTemplate.querySelector('img').src = props.author.avatar;
    pinTemplate.querySelector('img').alt = props.author.title;
    pinTemplate.style.left = props.location.x + 'px';
    pinTemplate.style.top = props.location.y + 'px';
    var onPinClick = function () {
      if (document.querySelector('.map__card')) {
        document.querySelector('.map__card').remove();
      }
      renderCard(props);
      document.addEventListener('keydown', onEscClosePopup);
    };
    pinTemplate.addEventListener('click', onPinClick);
    return pinTemplate;
  };

  var renderPins = function (pins) { // принимает массив объектов
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    pins.forEach(function (pin) {
      fragment.appendChild(getPin(pin)); // в качестве аргумента элемент (объект) массива pins
    });
    mapPins.appendChild(fragment);
  };

  var renderCard = function (props) { // сюда передаем массив объектов
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
    cardTemplate.querySelector('.popup__title').textContent = props.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = props.offer.address;
    cardTemplate.querySelector('.popup__text--price').innerHTML = props.offer.price + '<span>₽/ночь</span>';
    cardTemplate.querySelector('.popup__type').innerHTML = offerTypes[props.offer.type];
    cardTemplate.querySelector('.popup__text--capacity').textContent = props.offer.rooms + ' комнаты для ' + props.offer.guests + ' гостей.';
    cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + props.offer.checkin + ', ' + 'выезд до ' + props.offer.checkout;
    cardTemplate.querySelector('.popup__features').innerHTML = '';
    props.offer.features.forEach(function (item) {
      var popupFeature = document.createElement('li');
      popupFeature.classList.add('popup__feature', 'popup__feature--' + item);
      popupFeature.textContent = item;
      cardTemplate.querySelector('.popup__features').appendChild(popupFeature);
    });
    cardTemplate.querySelector('.popup__description').textContent = props.offer.description;
    cardTemplate.querySelector('.popup__photos').innerHTML = '';
    props.offer.photos.forEach(function (item) {
      var popupPhoto = document.createElement('img');
      popupPhoto.classList.add('popup__photo');
      popupPhoto.src = item;
      popupPhoto.style.width = 40 + 'px';
      popupPhoto.style.height = 40 + 'px';
      cardTemplate.querySelector('.popup__photos').appendChild(popupPhoto);
    });
    cardTemplate.querySelector('.popup__avatar').src = props.author.avatar;
    cardTemplate.querySelector('.popup__close').addEventListener('click', onButtonCloseClick);
    document.querySelector('.map').appendChild(cardTemplate);
  };
  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var leftCoordsLimit = 0;
      var rightCoordsLimit = 1135;
      var topCoordsLimit = 135;
      var bottomCoordsLimit = 620;

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (parseInt(mainPin.style.left, 10) < leftCoordsLimit) {
        mainPin.style.left = leftCoordsLimit + 'px';
      } else if (parseInt(mainPin.style.left, 10) > rightCoordsLimit) {
        mainPin.style.left = 1135 + 'px';
      }

      if (parseInt(mainPin.style.top, 10) < topCoordsLimit) {
        mainPin.style.top = topCoordsLimit + 'px';
      } else if (parseInt(mainPin.style.top, 10) > bottomCoordsLimit) {
        mainPin.style.top = bottomCoordsLimit + 'px';
      }
      fillAddressField(MAIN_PIN_HEIGHT_W_POINTER);
    };
    var onMouseUp = function () {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.map = {
    renderPins: renderPins,
    mainPin: mainPin,
    fillAddressField: fillAddressField
  };
})();
