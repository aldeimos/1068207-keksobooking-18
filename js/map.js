'use strict';

(function () {

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
      if (evt.keyCode === window.keyCodes.escKeycode) {
        item.parentElement.remove();
        document.removeEventListener('keydown', onEscClosePopup);
      }
    });
  };

  var getPin = function (props) { // в качестве аргумента элемент (объект) массива pins
    var pinTemplate = document.querySelector('#pin').content
      .querySelector('.map__pin').cloneNode(true);
    /* pinTemplate.style.left = (props.location.x - AVATAR_WIDTH / 2) + 'px';
    pinTemplate.style.top = (props.location.x - AVATAR_HEIGHT) + 'px'; */ // не понимаю, зачем я в этой функции два раза задавал стили координат пина)
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

  window.renderPins = function (pins) { // принимает массив объектов
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
    cardTemplate.querySelector('.popup__type').innerHTML = window.offerTypes[props.offer.type];
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
})();
