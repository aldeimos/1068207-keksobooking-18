'use strict';

var AVATAR_WIDTH = 50;
var AVATAR_HEIGHT = 70;
var LOCATION_X_START = AVATAR_WIDTH / 2;
var LOCATION_X_END = 1200 - AVATAR_WIDTH / 2; // Максимальная ширина <body>
var LOCATION_Y_START = 130;
var LOCATION_Y_END = 630;

var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 62;
var MAIN_PIN_HEIGHT_W_POINTER = MAIN_PIN_HEIGHT + 22;

var ESC__KEYCODE = 27;
var ENTER__KEYCODE = 13;

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

var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressField = document.querySelector('#address');

var inputPrice = adForm.querySelector('#price');
var typeSelect = adForm.querySelector('#type');

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

var setStartStateOfPage = function () {
  disableMainForm();
  disableHeaderForm();
  muteMap();
  getCoordinatesMainPin();
};

var activatePage = function () {
  clearMap();
  fillAddressField();
  setValidation();
  renderPins(pins);
  renderCard(pins);
  activateForm();
  activateHeaderForm();
};


var onButtonCloseClick = function () {
  var buttons = document.querySelectorAll('.popup__close');
  buttons.forEach(function (item) {
    item.parentElement.style.display = 'none';
  });
};

var onEscClosePopup = function (evt) {
  var buttons = document.querySelectorAll('.popup__close');
  buttons.forEach(function (item) {
    if (evt.keyCode === ESC__KEYCODE) {
      item.parentElement.style.display = 'none';
    }
  });
};

var onPinClick = function (evt) {
  var card = document.querySelectorAll('.map__card');
  var pinTemplateLeft = parseInt(evt.target.style.left, 10);
  var pinTemplateTop = parseInt(evt.target.style.top, 10);
  var pinTemplateBoth = pinTemplateLeft + ', ' + pinTemplateTop;
  card.forEach(function (item) {
    if (pinTemplateBoth === item.querySelector('.popup__text--address').textContent) {
      item.style.display = 'block';
    }
  });
};

var setActivatePage = function (evt) {
  if (evt.keyCode === ENTER__KEYCODE) {
    activatePage();
  }
};

var disableMainForm = function () {
  var inputArray = document.querySelectorAll('fieldset');
  inputArray.forEach(function (item) {
    item.setAttribute('disabled', true);
  });
  return inputArray;
};

var disableHeaderForm = function () {
  var selectArray = document.querySelectorAll('select');
  selectArray.forEach(function (item) {
    item.setAttribute('disabled', true);
  });
  return selectArray;
};

var activateForm = function () {
  var inputArray = document.querySelectorAll('fieldset');
  inputArray.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  return inputArray;
};

var activateHeaderForm = function () {
  var selectArray = document.querySelectorAll('select');
  selectArray.forEach(function (item) {
    item.removeAttribute('disabled');
  });
  return selectArray;
};

var clearMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
};

var muteMap = function () {
  document.querySelector('.map').classList.add('map--faded');
};

var getCoordinatesMainPin = function () {
  var x = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
  var y = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT / 2;
  addressField.value = x + ', ' + y;
};


var fillAddressField = function () {
  var x = parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2;
  var y = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT_W_POINTER;
  addressField.value = x + ', ' + y;
};

mainPin.addEventListener('mousedown', activatePage);

mainPin.addEventListener('keydown', setActivatePage);

document.addEventListener('keydown', onEscClosePopup);

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
  var pinTemplate = document.querySelector('#pin').content
    .querySelector('.map__pin').cloneNode(true);
  pinTemplate.style.left = (props.location.x - AVATAR_WIDTH / 2) + 'px';
  pinTemplate.style.top = (props.location.x - AVATAR_HEIGHT) + 'px';
  pinTemplate.querySelector('img').src = props.author.avatar;
  pinTemplate.querySelector('img').alt = props.author.title;
  pinTemplate.style.left = props.location.x + 'px';
  pinTemplate.style.top = props.location.y + 'px';
  pinTemplate.addEventListener('click', onPinClick);
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
    popupPhoto.style.width = 40 + 'px';
    popupPhoto.style.height = 40 + 'px';
    cardTemplate.querySelector('.popup__photos').appendChild(popupPhoto);
  });
  cardTemplate.querySelector('.popup__avatar').src = pinElement.author.avatar;
  cardTemplate.style.display = 'none';
  cardTemplate.querySelector('.popup__close').addEventListener('click', onButtonCloseClick);
  return cardTemplate;
};

var renderCard = function (cardElement) {
  cardElement.forEach(function (item) {
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(getCard(item));
    document.querySelector('.map').appendChild(cardFragment);
  });
};

var setValidation = function () {
  adForm.addEventListener('change', onFormChange);
};

var validateRoomsNumbers = function () {
  var roomsCapacityMap = {
    '1': {
      'guests': ['1'],
      'errorText': '1 комната для 1 гостя'
    },
    '2': {
      'guests': ['1', '2'],
      'errorText': '2 комнаты для 1 или 2 гостей'
    },
    '3': {
      'guests': ['1', '2', '3'],
      'errorText': '3 комнаты для 1, 2 или 3 гостей'
    },
    '100': {
      'guests': ['0'],
      'errorText': '100 комнат не для гостей'
    },
  };
  var roomsSelect = document.querySelector('[name=rooms]');
  var rooms = roomsSelect.value;
  var guests = document.querySelector('[name=capacity]').value;
  roomsSelect.setCustomValidity(roomsCapacityMap[rooms].guests.includes(guests) ? '' : roomsCapacityMap[rooms].errorText);
};

var validatorsMap = {
  'room_number': validateRoomsNumbers,
  'capacity': validateRoomsNumbers,
};

var onFormChange = function (e) {
  if (e.target.id && e.target.id in validatorsMap) {
    validatorsMap[e.target.id]();
  }
  validateTypes();
};

var validateTypes = function () {
  var selectedOption = typeSelect.value;
  var arrayObjTypes = [
    {
      type1: {
        type: 'palace',
        value: 10000
      },
      type2: {
        type: 'house',
        value: 5000
      },
      type3: {
        type: 'flat',
        value: 1000
      },
      type4: {
        type: 'bungalo',
        value: 0
      }
    }
  ];
  if (selectedOption === arrayObjTypes[0].type1.type) {
    inputPrice.min = arrayObjTypes[0].type1.value;
    inputPrice.placeholder = arrayObjTypes[0].type1.value;
  } else if (selectedOption === arrayObjTypes[0].type2.type) {
    inputPrice.min = arrayObjTypes[0].type2.value;
    inputPrice.placeholder = arrayObjTypes[0].type2.value;
  } else if (selectedOption === arrayObjTypes[0].type3.type) {
    inputPrice.min = arrayObjTypes[0].type3.value;
    inputPrice.placeholder = arrayObjTypes[0].type3.value;
  } else {
    inputPrice.min = arrayObjTypes[0].type4.value;
    inputPrice.placeholder = arrayObjTypes[0].type4.value;
  }
};

var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');
var onSelectTimeInChange = function () {
  selectTimeOut.value = selectTimeIn.value;
};

var onSelectTimeOutChange = function () {
  selectTimeIn.value = selectTimeOut.value;
};

selectTimeIn.addEventListener('change', onSelectTimeInChange);
selectTimeOut.addEventListener('change', onSelectTimeOutChange);


var preValidate = function () {
  Object.values(validatorsMap).forEach(function (fn) {
    fn();
  });
  inputPrice.min = 0;
  inputPrice.placeholder = 0;
  typeSelect.value = 'bungalo';
};

var pins = generatePins(8);
setStartStateOfPage();
preValidate();

