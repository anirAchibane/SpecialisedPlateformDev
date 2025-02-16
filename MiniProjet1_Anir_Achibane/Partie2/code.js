let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let timer; 
const defaultTime = 15;
let timeLeft = defaultTime;


const configForm = document.getElementById('config-form');
const configDiv = document.getElementById('config');
const quizDiv = document.getElementById('quiz');
const quizContainer = document.getElementById('quiz-container');
const validateButton = document.getElementById('validate');
const resultDiv = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');


configForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const category = document.getElementById('category').value;
  const difficulty = document.getElementById('difficulty').value;
  const amount = document.getElementById('amount').value;

  let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;
  if (category) {
    apiUrl += `&category=${category}`;
  }
  if (difficulty) {
    apiUrl += `&difficulty=${difficulty}`;
  }
  apiUrl += `&type=multiple`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.response_code !== 0) {
      alert("Aucun quiz n'a pu être généré. Essayez d'autres paramètres.");
      return;
    }
    quizData = data.results;
    configDiv.classList.add('hidden');
    quizDiv.classList.remove('hidden');
    displayQuestion();
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
});


function displayQuestion() {

  quizContainer.innerHTML = '';
  validateButton.disabled = true;
  timeLeft = defaultTime;
  clearInterval(timer);


  if (currentQuestionIndex >= quizData.length) {
    showResult();
    return;
  }

  const item = quizData[currentQuestionIndex];

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question';

  const questionText = document.createElement('p');
  questionText.innerHTML = `${currentQuestionIndex + 1}. ${item.question}`;
  questionDiv.appendChild(questionText);

  const answersDiv = document.createElement('div');
  let answers = [...item.incorrect_answers];
  answers.push(item.correct_answer);
  answers.sort(() => Math.random() - 0.5);

  answers.forEach(answer => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'question';
    radio.value = answer;
    radio.addEventListener('change', () => {
      validateButton.disabled = false;
    });
    label.appendChild(radio);
    label.insertAdjacentHTML('beforeend', ' ' + answer);
    answersDiv.appendChild(label);
  });
  questionDiv.appendChild(answersDiv);

  const timerDiv = document.createElement('div');
  timerDiv.className = 'timer';
  timerDiv.textContent = `Temps restant : ${timeLeft} s`;
  questionDiv.appendChild(timerDiv);

  quizContainer.appendChild(questionDiv);

  timer = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `Temps restant : ${timeLeft} s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      proceedToNextQuestion();
    }
  }, 1000);
}

validateButton.addEventListener('click', () => {
  clearInterval(timer);
  proceedToNextQuestion();
});

function proceedToNextQuestion() {
  const selected = document.querySelector('input[name="question"]:checked');
  const currentItem = quizData[currentQuestionIndex];

  if (selected && selected.value === currentItem.correct_answer) {
    score++;
  }
  currentQuestionIndex++;

  displayQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showResult() {
  quizDiv.classList.add('hidden');
  resultDiv.classList.remove('hidden');
  scoreDisplay.textContent = `Vous avez obtenu ${score} sur ${quizData.length}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

restartButton.addEventListener('click', () => {
  window.location.reload();
});
