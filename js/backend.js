'use strict';

(function () {
  window.backend = {
    load: function (onSuccess, onError) {
      var GET_URL = 'https://js.dump.academy/keksobooking/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      var onFormDownload = function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      };
      var onFormServerError = function () {
        onError('Произошла ошибка соединения');
      };
      var onFormServerTimeout = function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      };
      xhr.addEventListener('load', onFormDownload);

      xhr.addEventListener('error', onFormServerError);
      xhr.addEventListener('timeout', onFormServerTimeout);

      xhr.timeout = 10000;

      xhr.open('GET', GET_URL);
      xhr.send();
    }
  };
})();
