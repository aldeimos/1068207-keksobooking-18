'use strict';

(function () {
  window.keyCodes = {
    escKeycode: 27,
    enterKeycode: 13
  };
  window.util = {
    shuffleArray: function (array) {
      var tempArray = array.slice();
      for (var i = tempArray.length - 1; i > 0; i--) {
        var j = window.util.getRandomNumber(i);
        var temp = tempArray[i];
        tempArray[i] = tempArray[j];
        tempArray[j] = temp;
      }
      return tempArray;
    },
    getArrayWithRandomLength: function (array) {
      return window.util.shuffleArray(array).slice(0, window.util.getRandomNumber(array.length));
    },
    randomIntFromInterval: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomNumber: function (number) {
      return Math.floor(Math.random() * (number + 1));
    },
    getRandomElementFromArray: function (array) {
      return array[window.util.getRandomNumber(array.length - 1)];
    }
  };
})();
