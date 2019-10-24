'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  var shuffleArray = function (array) {
    var tempArray = array.slice();
    for (var i = tempArray.length - 1; i > 0; i--) {
      var j = window.util.getRandomNumber(i);
      var temp = tempArray[i];
      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
    }
    return tempArray;
  };
  var getArrayWithRandomLength = function (array) {
    return window.util.shuffleArray(array).slice(0, window.util.getRandomNumber(array.length));
  };
  var randomIntFromInterval = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var getRandomNumber = function (number) {
    return Math.floor(Math.random() * (number + 1));
  };
  var getRandomElementFromArray = function (array) {
    return array[window.util.getRandomNumber(array.length - 1)];
  };
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.util = {
    shuffleArray: shuffleArray,
    getArrayWithRandomLength: getArrayWithRandomLength,
    randomIntFromInterval: randomIntFromInterval,
    getRandomNumber: getRandomNumber,
    getRandomElementFromArray: getRandomElementFromArray,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    debounce: debounce
  };
})();
