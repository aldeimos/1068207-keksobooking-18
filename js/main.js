'use strict';

var AVATAR_WIDTH = 50;
var AVATAR_HEIGHT = 70;
var LOCATION_X_START = AVATAR_WIDTH / 2;
var LOCATION_X_END = 1200 - AVATAR_WIDTH / 2; // Максимальная ширина <body>
var LOCATION_Y_START = 130;
var LOCATION_Y_END = 630;


var offerTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

var offerTypesArray = Object.keys(offerTypes);

var offerFeaturesList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var activatePage = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

var shuffleArray = function (array) {
  var tempArray = array.slice();
  for (var i = tempArray.length - 1; i > 0; i--) {
    var j = getRandomNumber(i);
    var temp = tempArray[i];
    tempArray[i] = tempArray[j];
    tempArray[j] = temp;
  }
  return tempArray;
};

var getArrayWithRandomLength = function (array) {
  return shuffleArray(array).slice(0, getRandomNumber(array.length));
};

var randomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

var getRandomElementFromArray = function (array) {
  return array[getRandomNumber(array.length - 1)];
};

var generatePins = function (num) {
  var arrayTemplate = [];
  for (var i = 1; i <= num; i++) {
    var objectTemplate = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Квартира',
        address: 's',
        price: 250,
        type: getRandomElementFromArray(offerTypesArray),
        rooms: randomIntFromInterval(1, 4),
        guests: randomIntFromInterval(0, 10),
        checkin: getRandomElementFromArray(CHECK_IN),
        checkout: getRandomElementFromArray(CHECK_OUT),
        features: getArrayWithRandomLength(offerFeaturesList),
        description: 'строка с описанием',
        photos: getArrayWithRandomLength(PHOTOS)
      },
      location: {
        x: randomIntFromInterval(LOCATION_X_START, LOCATION_X_END),
        y: randomIntFromInterval(LOCATION_Y_START, LOCATION_Y_END) // 130 - 600
      },
      getAddressEqualToLocation: function () {
        objectTemplate.offer.address = objectTemplate.location.x + ', ' + objectTemplate.location.y;
      }
    };
    objectTemplate.getAddressEqualToLocation();
    arrayTemplate.push(objectTemplate);
  }
  return arrayTemplate;
};


var getPin = function (props) {
  var pinTemplate = document.querySelector("#pin").content
    .querySelector(".map__pin").cloneNode(true);
  pinTemplate.style.left = (props.location.x - AVATAR_WIDTH / 2) + 'px';
  pinTemplate.style.top = (props.location.x - AVATAR_HEIGHT) + 'px';
  pinTemplate.querySelector('img').src = props.author.avatar;
  pinTemplate.querySelector('img').alt = props.author.title;
  pinTemplate.style.left = props.location.x + 'px';
  pinTemplate.style.top = props.location.y + 'px';
  return pinTemplate;
};

var renderPins = function (pins) {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  pins.forEach(function (pin) {
    fragment.appendChild(getPin(pin));
  });
  mapPins.appendChild(fragment);
};


var getCard = function (pinElement) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
  cardTemplate.querySelector('.popup__title').textContent = pinElement.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = pinElement.offer.address;
  cardTemplate.querySelector('.popup__text--price').innerHTML = pinElement.offer.price + '<span>₽/ночь</span>';
  cardTemplate.querySelector('.popup__type').innerHTML = offerTypes[pinElement.offer.type];
  cardTemplate.querySelector('.popup__text--capacity').textContent = pinElement.offer.rooms + ' комнаты для ' + pinElement.offer.guests + ' гостей.';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinElement.offer.checkin + ', ' + 'выезд до ' + pinElement.offer.checkout;
  cardTemplate.querySelector('.popup__features').innerHTML = '';

  pinElement.offer.features.forEach(function (item) {
    var popupFeature = document.createElement('li');
    popupFeature.classList.add('popup__feature', 'popup__feature--' + item);
    popupFeature.textContent = item;
    cardTemplate.querySelector('.popup__features').appendChild(popupFeature);
  });

  cardTemplate.querySelector('.popup__description').textContent = pinElement.offer.description;

  cardTemplate.querySelector('.popup__photos').innerHTML = '';
  pinElement.offer.photos.forEach(function (item) {
    var popupPhoto = document.createElement('img');
    popupPhoto.classList.add('popup__photo');
    popupPhoto.src = item;
    popupPhoto.style.width = 70 + 'px';
    popupPhoto.style.height = 70 + 'px';
    cardTemplate.querySelector('.popup__photos').appendChild(popupPhoto);
  });
  cardTemplate.querySelector('.popup__avatar').src = pinElement.author.avatar;
  return cardTemplate;
};

var renderCard = function (cardElement) {
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(getCard(cardElement));
  document.querySelector('.map').appendChild(cardFragment);

};

var pins = generatePins(8);
renderPins(pins);
renderCard(pins[0]);
activatePage();


