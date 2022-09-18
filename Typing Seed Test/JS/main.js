// Selectors & Global variables
const typingText = document.querySelector('.typing-text p'),
  inputField = document.querySelector('.input-field'),
  mistakes = document.querySelector(' .mistakes p span'),
  timeTag = document.querySelector('.time span'),
  cpmTag = document.querySelector('.cpm span'),
  wpmTag = document.querySelector('.wpm span'),
  tryAgainBtn = document.querySelector('.result-details button');

let idxCounter = 0,
  mistakeCounter = 0;

let timer,
  maxTime = 60,
  timeInterval = maxTime,
  isTyping = false;

// Events
// focusing input field on 'keydown' or 'click' event
document.addEventListener('keydown', () => inputField.focus());
document.addEventListener('click', () => inputField.focus());

inputField.addEventListener('input', checkMatching);

tryAgainBtn.addEventListener('click', resetTest);

// Functions
function getRandomParagraphs() {
  const randomIdx = Math.floor(Math.random() * paragraphs.length);
  // ## Why this line!!?
  // because when we hit "Try again", the previous paragraph is still
  // here; so i want to remove the previous one before adding new one
  typingText.innerHTML = '';

  paragraphs[randomIdx].split('').forEach((char) => {
    let spanTag = `<span>${char}</span>`;
    typingText.innerHTML += spanTag;
  });
  // showing the blinking underline to first character by default
  typingText.querySelectorAll('span')[0].classList.add('active');
}
getRandomParagraphs();

function checkMatching() {
  const userInput = inputField.value.split('')[idxCounter];
  const typingChars = typingText.querySelectorAll('span');

  // ## I want user can't typed if the time is 0, How!?
  // By using "if statment", insid code will run only is the user has typed
  // less than "typingChars.length" and timer is greater than 0
  if (idxCounter < typingChars.length - 1 && timeInterval > 0) {
    // timeHandler();  ## Will case a problem, How!!?
    // There is a problem and that is, the timeHandler function is calling
    // every time when user input value but we've to call it on the first user input only..

    // The solution for above problem:
    // once timer is start, it won't restart again on every key clicked
    if (!isTyping) {
      timeHandler();
      isTyping = true;
    }

    // if user hasn't entered any character or pressed "backspace"
    if (userInput == null) {
      idxCounter--;
      if (typingChars[idxCounter].classList.contains('incorrect')) {
        mistakeCounter--;
      }
      typingChars[idxCounter].classList.remove('correct', 'incorrect');
    } else {
      if (userInput === typingChars[idxCounter].textContent) {
        typingChars[idxCounter].classList.add('correct');
      } else {
        mistakeCounter++;
        typingChars[idxCounter].classList.add('incorrect');
      }
      // increment idxCounter when user typed correct or incorrect character
      idxCounter++;
    }
    // first, removing active class from all span and then adding to current span tag only
    typingChars.forEach((char) => char.classList.remove('active'));
    typingChars[idxCounter].classList.add('active');

    mistakes.textContent = mistakeCounter;

    cpmTag.textContent = idxCounter - mistakeCounter; // CPM will not count mistakes
    // assuming 5 characters = 1 word
    let wpm = Math.round(
      ((idxCounter - mistakeCounter) / 5 / (maxTime - timeInterval)) * 60
    );
    // if wpm value is 0, empty, or infiniyt then setting it's value to 0
    wpm = wpm < 0 || wpm === Infinity || !wpm ? 0 : wpm;
    wpmTag.textContent = wpm;
  } else {
    inputField.value = '';
  }
}

function timeHandler() {
  timer = setInterval(() => {
    if (timeInterval > 0) {
      timeInterval--;
      timeTag.textContent = timeInterval;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function resetTest() {
  // get a random paragraph and reseting each variables and elements value to default
  getRandomParagraphs();
  clearInterval(timer);
  inputField.value = '';

  idxCounter = 0;
  mistakeCounter = 0;
  maxTime = 5;
  timeInterval = maxTime;
  isTyping = false;

  mistakes.textContent = 0;
  cpmTag.textContent = 0;
  wpmTag.textContent = 0;
  timeTag.textContent = timeInterval;

  // Also, we can simply use this line instead of all of the above
  // window.location.reload();
}
