'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var inputPrice = adForm.querySelector('#price');
  var typeSelect = adForm.querySelector('#type');

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
    var selectedOption = typeSelect.value; // выбранный option селекта type
    var arrayObjTypes = {
      'palace': 10000,
      'house': 5000,
      'flat': 1000,
      'bungalo': 0,
    };
    inputPrice.min = arrayObjTypes[selectedOption]; // Тут мы проходимся по словарю с помощью значения, которое получили из selectedOption и по нему задаем значения ипнутов
    inputPrice.placeholder = arrayObjTypes[selectedOption];
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
  };
  preValidate();
  window.validation = {
    setFormChecking: setValidation,
    adForm: adForm
  };
})();
