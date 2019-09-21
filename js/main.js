'use strict';

var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;
var LOCATION_X_START = 50;
var LOCATION_X_END = 1200; // Максимальная ширина <body>
var LOCATION_Y_START = 130;
var LOCATION_Y_END = 630;
var OBJECT_QUANTITY = 8;

var pinsTemplate = [];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
map.classList.remove('map--faded');

var getArray = function () {
  var arrayTemplate = {
    author: {
      avatar: 'img/avatars/user0' + +(i + 1) + '.png'
    },
    offer: {
      title: 'Квартира',
      address: '600, 500',
      price: 250,
      type: ['palace', 'flat', 'house', 'bundalo'],
      rooms: 4,
      guests: [1, 2, 3],
      checkin: ['12:00', '13:00', '14:00'],
      checkout: ['12:00', '13:00', '14:00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'строка с описанием',
      photos: [
        'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
        'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
      ]
    },
    location: {
      x: 250,
      y: 130 // 130 - 600
    }
  };
  return arrayTemplate;
};

var makeElement = function (tagName, className, x, y, src, alt, width, height) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (src) {
    element.src = src;
  }
  if (y || x) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
  }
  if (alt) {
    element.alt = alt;
  }
  if (width || height) {
    element.style.width = width + 'px';
    element.style.height = height + 'px';
  }
  return element;
};

var randomIntFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

for (var j = 0; j < OBJECT_QUANTITY; j++) {
  pinsTemplate.push(getArray());
}

for (var i = 0; i <= pinsTemplate.length - 1; i++) {
  pinsTemplate[i].author.avatar = getArray(i).author.avatar;

  pinsTemplate[i].offer.type = getArray().offer.type[Math.floor(Math.random() * pinsTemplate[i].offer.type.length)];

  pinsTemplate[i].offer.guests = getArray().offer.guests[
    Math.floor(Math.random() * pinsTemplate[i].offer.guests.length)
  ];

  pinsTemplate[i].offer.checkin = getArray().offer.checkin[
    Math.floor(Math.random() * pinsTemplate[i].offer.checkin.length)
  ];
  pinsTemplate[i].offer.checkout = getArray().offer.checkout[
    Math.floor(Math.random() * pinsTemplate[i].offer.checkout.length)
  ];
  var startSlice = Math.floor(Math.random() * pinsTemplate[i].offer.features.length);
  var endSlice = Math.round(Math.random() * pinsTemplate[i].offer.features.length);
  if (startSlice > endSlice) {
    startSlice = 0;
  }
  if (startSlice === endSlice) {
    endSlice += Math.round(Math.random() * pinsTemplate[i].offer.features.length);
  }

  pinsTemplate[i].offer.features = pinsTemplate[i].offer.features.slice(startSlice, endSlice);
  startSlice = Math.floor(Math.random() * pinsTemplate[i].offer.photos.length);
  endSlice = Math.round(Math.random() * pinsTemplate[i].offer.photos.length);
  if (startSlice > endSlice) {
    startSlice = 0;
  }
  if (startSlice === endSlice) {
    endSlice += Math.round(Math.random() * pinsTemplate[i].offer.photos.length);
  }
  pinsTemplate[i].offer.photos = pinsTemplate[i].offer.photos.slice(startSlice, endSlice);
  pinsTemplate[i].location.x = randomIntFromInterval(LOCATION_X_START, LOCATION_X_END);
  pinsTemplate[i].location.y = randomIntFromInterval(LOCATION_Y_START, LOCATION_Y_END);

  var pinButton = makeElement('button', 'map__pin', pinsTemplate[i].location.x, pinsTemplate[i].location.y);
  var pinImg = makeElement('img', 'map__pin-img', '', '', pinsTemplate[i].author.avatar, pinsTemplate[i].offer.title, AVATAR_WIDTH, AVATAR_HEIGHT);
  mapPins.appendChild(pinButton);
  pinButton.appendChild(pinImg);
}
