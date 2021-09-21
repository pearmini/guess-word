var container = document.querySelector("#word-container > span");
var words = unique(DICT);
var currentIndex = -1;

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

function updateWord(index) {
  var word = words[index];
  container.innerHTML = word;
}

function platform() {
  var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTabvar =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tabvar)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTabvar,
    isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTabvar: isTabvar,
    isPhone: isPhone,
    isAndroid: isAndroid,
    isPc: isPc,
  };
}

function nextWord() {
  currentIndex++;
  if (currentIndex >= words.length) {
    alert("没有更多的词了～");
    return;
  }
  updateWord(currentIndex);
}

function previousWord() {
  currentIndex--;
  if (currentIndex < 0) {
    alert("已经第一个词了～");
    return;
  }
  updateWord(currentIndex);
}

nextWord();
alert(
  `点击屏幕右边切换到下一个词，\n点击屏幕左边切换到上一个词，\n目前一共有${words.length}个词语。`
);

var onClickWithDebounce = debounce(function onClick(e) {
  console.log(e);
  if (e.pageX < window.innerWidth / 2) {
    previousWord();
  } else {
    nextWord();
  }
});

window.addEventListener("click", onClickWithDebounce);
window.addEventListener("touchstart", onClickWithDebounce);

window.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    document.documentElement.requestFullscreen();
  }
});
