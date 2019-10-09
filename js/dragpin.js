'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT_W_POINTER = 62 + 22;

  var mainPin = window.map.mainPin;

  var addressField = document.querySelector('#address');

  var fillAddressField = function (pinPointer) {
    addressField.value = (parseInt(mainPin.style.top, 10) + pinPointer) + ', ' + (parseInt(mainPin.style.left, 10) + MAIN_PIN_WIDTH / 2);
    return addressField;
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
  window.dragpin = {
    fillAddressField: fillAddressField
  };
})();
