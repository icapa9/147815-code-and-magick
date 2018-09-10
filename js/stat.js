'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var COLUMN_WIDTH = 40;
var COLUMN_Y = 150;
var CLOUD_X = 140;
var CLOUD_Y = 90;
var GAP = 50;
var TEXT_Y = 260;

var getRandomBlue = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// ищет максимальный элемент в массиве
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff333');

  // текст заголовка;
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // столбики гистограммы

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[i], CLOUD_X + GAP * i, TEXT_Y);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * i, 85); // 85 магическое число, не получается привязать к высоте столбца

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, ' + getRandomBlue(255) + ', 255, 1)';
    }

    ctx.fillRect(CLOUD_X + GAP * i, CLOUD_Y, COLUMN_WIDTH, COLUMN_Y * times[i] / maxTime);
  }
};
