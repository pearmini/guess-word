function debounce(fn) {
  var timer = null;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, 100);
  };
};

function unique(list) {
  var arr = [];
  var map = {};
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    if (!map[element]) {
      arr.push(element);
      map[element] = 1;
    }
  }
  return arr;
}



var measureTextSpan;

function createSpan() {
  if (measureTextSpan) return measureTextSpan;
  measureTextSpan = document.createElement('span');
  // 不显示在视窗
  measureTextSpan.style.visibility = 'hidden';
  measureTextSpan.style.position = 'absolute';
  measureTextSpan.style.display = 'inline';
  measureTextSpan.style.left = '-1000px';
  measureTextSpan.style.top = '-1000px';

  document.body.appendChild(measureTextSpan);

  return measureTextSpan
}

/**
 * measure text By DOM
 * @param text
 * @param font
 */
function measureTextByDOM(text, font) {
  // 先创建 span
  var span = createSpan();

  span.style.fontSize = `${font.fontSize}px`;
  span.style.fontFamily = font.fontFamily;
  span.style.fontWeight = font.fontWeight;
  span.style.fontStyle = font.fontStyle;
  span.style.fontVariant = font.fontVariant;

  span.innerHTML = text;

  return span.clientWidth;
}
