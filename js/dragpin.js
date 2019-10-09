'use strict';
// комментарий, чтобы гитхаб позволил сделать пулл реквест
(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT_W_POINTER = 62 + 22;

  var LEFT_COORDS_LIMIT = 0;
  var RIGHT_COORDS_LIMIT = 1135;
  var TOP_COORDS_LIMIT = 135;
  var BOTTOM_COORDS_LIMIT = 620;

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

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (parseInt(mainPin.style.left, 10) < LEFT_COORDS_LIMIT) {
        mainPin.style.left = LEFT_COORDS_LIMIT + 'px';
      } else if (parseInt(mainPin.style.left, 10) > RIGHT_COORDS_LIMIT) {
        mainPin.style.left = RIGHT_COORDS_LIMIT + 'px';
      }

      if (parseInt(mainPin.style.top, 10) < TOP_COORDS_LIMIT) {
        mainPin.style.top = TOP_COORDS_LIMIT + 'px';
      } else if (parseInt(mainPin.style.top, 10) > BOTTOM_COORDS_LIMIT) {
        mainPin.style.top = BOTTOM_COORDS_LIMIT + 'px';
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
