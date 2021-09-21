var container = document.querySelector("#word-container > span");
var words = unique(DICT);
var currentIndex = -1;

var font = {
  fontSize: 200,
  fontFamily: '',
  fontWeight: 'bold',
  fontStyle: '',
  fontVariant: '',
}

function getTextFontSize(text) {
  const width = measureTextByDOM(text, font);
  return window.innerWidth * 0.8 / width * font.fontSize;
}

function updateWord(index) {
  var word = words[index];
  container.innerHTML = word;
  // 自适应字体大小
  container.style.fontSize = getTextFontSize(word) + 'px';
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
  if (e.pageX < window.innerWidth / 2) {
    previousWord();
  } else {
    nextWord();
  }
});

// 事件，pc 和 mobile
window.addEventListener("click", onClickWithDebounce);
window.addEventListener("touchstart", onClickWithDebounce);

window.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    document.documentElement.requestFullscreen();
  }
});
