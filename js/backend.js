'use strict';

(function () {
  window.backend = {
    load: function (onSuccess, onError) {
      var GET_URL = 'https://js.dump.academy/keksobooking/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      var onLoad = function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      };
      var onRequestError = function () {
        onError('Произошла ошибка соединения');
      };
      var onTimeout = function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      };
      xhr.addEventListener('load', onLoad);

      xhr.addEventListener('error', onRequestError);
      xhr.addEventListener('timeout', onTimeout);

      xhr.timeout = 10000;

      xhr.open('GET', GET_URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) { // комментарий, чтобы пустил на пуллреквест
      var POST_URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      var onFormUploadStatus = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      };

      xhr.addEventListener('load', onFormUploadStatus);

      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();
