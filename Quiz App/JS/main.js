// Selectors:
const startBtn = document.querySelector('.start-btn button');
const infoBox = document.querySelector('.info-box');
const exitBtn = infoBox.querySelector('.actions .quit');
const continueBtn = infoBox.querySelector('.actions .restart');
const quizBox = document.querySelector('.quiz-box');
const timerCount = quizBox.querySelector('.timer span');
const timeLine = quizBox.querySelector('.header .time-line');
const nextBtn = quizBox.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');
const quitQuiz = resultBox.querySelector('.actions .quit');
const replayQuiz = resultBox.querySelector('.actions .restart');

// If startQuiz button clicked:
startBtn.onclick = () => {
  infoBox.classList.add('activeInfo');
};

// If exitQuiz button clicked
exitBtn.onclick = () => {
  infoBox.classList.remove('activeInfo');
};

// If continue button clicked
continueBtn.onclick = () => {
  infoBox.classList.remove('activeInfo');
  quizBox.classList.add('activeQuiz');
  quizBoxHandler(0);
  timerHandler(15);
  timeLineHandler(0);

  nextBtn.style.display = 'none';
};

let count = 0;
let timeInterval = 15;
let timer;
let timeLineCounter;
let userScore = 0;

// If nextQue button clicked
nextBtn.onclick = () => {
  if (count < questions.length - 1) {
    count++;
    quizBoxHandler(count);

    clearInterval(timer);
    timerCount.textContent = timeInterval;
    timerHandler(timeInterval);

    clearInterval(timeLineCounter);
    timeLineHandler(0);

    nextBtn.style.display = 'none';
    quizBox.querySelector('.timer p').textContent = 'Time left';
    quizBox.querySelector('.timer p').style.color = 'black';
  } else {
    resultBoxHandler();
    count = 0;
  }
};
// Functions:
function quizBoxHandler(idx) {
  const question = document.querySelector('.question');
  question.innerHTML = `
      <h2>${questions[idx].numb}. ${questions[idx].question}</h2>
      <ul class="option-list">
        <li class="option">
          <p>${questions[idx].options[0]}</p>
        </li>
        <li class="option">
          <p>${questions[idx].options[1]}</p>
        </li>
        <li class="option">
          <p>${questions[idx].options[2]}</p>
        </li>
        <li class="option">
          <p>${questions[idx].options[3]}</p>
        </li>
      </ul>
  `;

  const totalQue = quizBox.querySelector('.total-que');
  totalQue.innerHTML = `
    <p><span>${idx + 1}</span> of <span>${questions.length}</span> Questions</p>
  `;

  // option selected
  const allOptions = [...question.querySelectorAll('.option-list .option')];
  allOptions.forEach((option) => {
    option.onclick = (e) => {
      clearInterval(timer);
      clearInterval(timeLineCounter);

      let correctAns = questions[idx].answer;
      let iconTick = document.createElement('div');
      option.appendChild(iconTick);

      nextBtn.style.display = 'block';

      if (correctAns === e.target.innerText) {
        userScore++;
        iconTick.classList.add('icon', 'tick');
        iconTick.innerHTML = `<i class="fas fa-check"></i>`;
        option.classList.add('correct');
        // once user selected disabled all options
        option.parentElement.classList.add('disabled');
      } else {
        iconTick.classList.add('icon', 'cross');
        iconTick.innerHTML = `<i class="fas fa-times"></i>`;
        option.classList.add('incorrect');
        option.parentElement.classList.add('disabled');

        // if answers is incorrect, then automatically selected the correct answer
        allOptions.filter((option) => {
          option.innerText === correctAns && option.classList.add('correct');
        });
      }
    };
  });
}

function resultBoxHandler() {
  quizBox.classList.remove('activeQuiz');
  resultBox.classList.add('activeResult');

  quitQuiz.onclick = () => {
    resultBox.classList.remove('activeResult');
    window.location.reload();
  };

  replayQuiz.onclick = () => {
    resultBox.classList.remove('activeResult');
    quizBox.classList.add('activeQuiz');
    quizBoxHandler(0);
    nextBtn.style.display = 'none';
    timerCount.textContent = timeInterval;
    timerHandler(15);
    clearInterval(timeLineCounter);
    timeLineHandler(0);
    // reset score to zero
    userScore = 0;
  };

  const scoreText = resultBox.querySelector('.score-text');
  if (userScore == questions.length) {
    scoreText.innerHTML = `
        <p>Congratulations🥳, You got <span>${userScore}</span> out of <span>${questions.length}</span></p>
    `;
  } else {
    scoreText.innerHTML = `
        <p>Sorry, You got only <span>${userScore}</span> out of <span>${questions.length}</span></p>
    `;
  }
}

function timerHandler(time) {
  timer = setInterval(() => {
    time--;
    timerCount.textContent = time;

    if (time < 10) {
      timerCount.textContent = `0${time}`;
    }

    if (time <= 0) {
      timerCount.textContent = '00';
      clearInterval(timer);

      // check correct automatically after time off
      const allOptions = [...document.querySelectorAll('.option-list .option')];
      let correctAns = questions[count].answer;
      allOptions.forEach((option) => {
        option.innerText === correctAns && option.classList.add('correct');
        option.parentElement.classList.add('disabled');
      });

      nextBtn.style.display = 'block';

      quizBox.querySelector('.timer p').textContent = 'Time off';
      quizBox.querySelector('.timer p').style.color = 'red';
    }
  }, 1000);
}

function timeLineHandler(time) {
  timeLineCounter = setInterval(() => {
    time += 1;
    timeLine.style.width = `${time}px`;
    if (time > 539) {
      clearInterval(timeLineCounter);
    }
  }, 28);
}
