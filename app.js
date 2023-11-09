const questions = [
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Seoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "Who wrote the play 'Hamlet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "Leo Tolstoy", correct: false },
    ],
  },
  {
    question: "In which year did the Titanic sink?",
    answers: [
      { text: "1910", correct: false },
      { text: "1925", correct: false },
      { text: "1932", correct: false },
      { text: "1912", correct: true },
    ],
  },
  {
    question: "What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Hippopotamus", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false },
    ],
  },
];

const questionsElement = document.getElementById("question");
const answerButton = document.getElementById("anwser-buttons");
const nextButton = document.getElementById("next-btn");
let currentQusetoinIndex = 0;
let score = 0;

let startQuiz = () => {
  currentQusetoinIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQusetion();
};

let showQusetion = () => {
  resetState();
  let currentQusetion = questions[currentQusetoinIndex];
  let questionNo = currentQusetoinIndex + 1;
  questionsElement.innerHTML = questionNo + ". " + currentQusetion.question;

  currentQusetion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};
let resetState = () => {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
};

let selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
};

let showScore = () => {
  resetState();
  questionsElement.innerHTML = `<p>Congratulations on completing the quiz!</p>
     Your scored: ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
};

let handleNextButton = () => {
  currentQusetoinIndex++;
  if (currentQusetoinIndex < questions.length) {
    showQusetion();
  } else {
    showScore();
  }
};

nextButton.addEventListener("click", () => {
  if (currentQusetoinIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
