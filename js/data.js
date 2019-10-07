'use strict';

(function () {
  var AVATAR_WIDTH = 50;
  var LOCATION_X_START = AVATAR_WIDTH / 2;
  var LOCATION_X_END = 1200 - AVATAR_WIDTH / 2; // Максимальная ширина <body>
  var LOCATION_Y_START = 130;
  var LOCATION_Y_END = 630;

  window.offerTypes = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var offerTypesArray = Object.keys(window.offerTypes);

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
      var randomX = window.util.randomIntFromInterval(LOCATION_X_START, LOCATION_X_END);
      var randomY = window.util.randomIntFromInterval(LOCATION_Y_START, LOCATION_Y_END);
      var objectTemplate = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },
        offer: {
          title: 'Квартира',
          address: randomX + ', ' + randomY,
          price: 250,
          type: window.util.getRandomElementFromArray(offerTypesArray),
          rooms: window.util.randomIntFromInterval(1, 4),
          guests: window.util.randomIntFromInterval(0, 10),
          checkin: window.util.getRandomElementFromArray(CHECK_IN),
          checkout: window.util.getRandomElementFromArray(CHECK_OUT),
          features: window.util.getArrayWithRandomLength(offerFeaturesList),
          description: 'строка с описанием',
          photos: window.util.getArrayWithRandomLength(PHOTOS)
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
  window.pins = generatePins(8);
})();
