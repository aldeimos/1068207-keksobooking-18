'use strict';

(function () {
  var getArrayWithRandomLength = window.util.getArrayWithRandomLength;
  var randomIntFromInterval = window.util.randomIntFromInterval;
  var getRandomElementFromArray = window.util.getRandomElementFromArray;

  var AVATAR_WIDTH = 50;
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
  var generatePins = function (num) {
    var arrayTemplate = [];
    for (var i = 1; i <= num; i++) {
      var randomX = randomIntFromInterval(LOCATION_X_START, LOCATION_X_END);
      var randomY = randomIntFromInterval(LOCATION_Y_START, LOCATION_Y_END);
      var objectTemplate = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: 'Квартира',
          address: randomX + ', ' + randomY,
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
          x: randomX,
          y: randomY
        },
      };
      arrayTemplate.push(objectTemplate);
    }
    return arrayTemplate;
  };
  var pins = generatePins(8);
  window.data = {
    pins: pins,
    offerTypes: offerTypes,
  };
})();
