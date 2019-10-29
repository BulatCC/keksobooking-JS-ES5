'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (success) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        success(xhr.response);
        // данные для отрисовки карточки
        var serverData = xhr.response;
        window.serverData = serverData;
      } else {
        // если все плохо, выводит ошибку
        window.messages.onError();
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();

