'use strict';

(function () {
// загружает данные с сервера
  window.load();
  // находит расположение фильтров в разметке
  var filters = window.map.map.querySelector('.map__filters');
  var filterPlaceType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRoomsQuantity = filters.querySelector('#housing-rooms');
  var filterGuestsQuantity = filters.querySelector('#housing-guests');
  var filterFeatures = filters.querySelector('#housing-features');


  // значение цен
  var PriceValue = {
    LOW: 'low',
    MID: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  // обработчик событий реагирующие на изменеия параметров фильтра
  filters.addEventListener('change', window.map.onShowMapAndForm);

  // функция для фильтрации по типу жилья
  var placeFiltration = function (item) {
    if (filterPlaceType.value === 'any') {
      return true;
    } else {
      return filterPlaceType.value === item.offer.type;
    }
  };

  // функция для фильтрации по цене
  var priceFiltration = function (item) {
    if (filterPrice.value === 'any') {
      return true;
    } else if (filterPrice.value === PriceValue.LOW) {
      return item.offer.price < PriceValue.MIN;
    } else if (filterPrice.value === PriceValue.MID) {
      return item.offer.price >= PriceValue.MIN && item.offer.price <= PriceValue.MAX;
    } else {
      return item.offer.price > PriceValue.MAX;
    }
  };

  // функция для фильтрации по количеству комнат
  var roomsFiltration = function (item) {
    if (filterRoomsQuantity.value === 'any') {
      return true;
    } else {
      return +filterRoomsQuantity.value === item.offer.rooms;
    }
  };

  // функция для фильтрации по количеству гостей
  var guestsFiltration = function (item) {
    if (filterGuestsQuantity.value === 'any') {
      return true;
    } else {
      return +filterGuestsQuantity.value === item.offer.guests;
    }
  };

  // функция для фильтрации по фичам, не смог передать значения для отрисовки
  var featuresFiltration = function () {
    return Array.from(filterFeatures.querySelectorAll(':checked'))
      .filter(function (feature) {
        return feature.value;
      })
      .map(function (feature) {
        return feature.value;
      });
  };

  // фильтрует данные для отрисовки
  var comparing = function (data) {
    window.compared = data.filter(function (item) {
      return (
        placeFiltration(item)
        && roomsFiltration(item)
        && priceFiltration(item)
        && guestsFiltration(item)
        && featuresFiltration(item)
      );
    }).slice(0, 5);
  };

  window.filter = {
    comparing: comparing
  };
})();
