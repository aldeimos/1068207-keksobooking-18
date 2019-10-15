'use strict';

(function () {
  var ESC_KEYCODE = window.util.ESC_KEYCODE;

  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

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

  var deletePins = function () {
    var mapPinsChild = mapPins.querySelectorAll('.map__pin');
    mapPinsChild.forEach(function (item) {
      mapPins.removeChild(item);
    });
    mapPins.appendChild(mainPin);
  };

  var renderPins = function (pins) { // принимает массив объектов
    var fragment = document.createDocumentFragment();
    deletePins();
    pins.slice(0, 5).forEach(function (pin) {
      fragment.appendChild(getPin(pin)); // в качестве аргумента элемент (объект) массива pins
    });
    mapPins.appendChild(fragment);
  };

  var renderCard = function (props) { // сюда передаем массив объектов
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
    cardTemplate.querySelector('.popup__title').textContent = props.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = props.offer.address;
    cardTemplate.querySelector('.popup__text--price').innerHTML = props.offer.price + '<span>₽/ночь</span>';
    cardTemplate.querySelector('.popup__type').innerHTML = props.offer.type;
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

  window.map = {
    renderPins: renderPins,
    mainPin: mainPin
  };
})();
