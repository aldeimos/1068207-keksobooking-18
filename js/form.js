'use strict';

(function () {
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
  window.form = {
    disableMain: disableMainForm,
    disableHeader: disableHeaderForm,
    activate: activateForm,
    activateHeader: activateHeaderForm
  };
})();

