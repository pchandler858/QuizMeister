const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const scoreContainerElement = document.getElementById("score-container");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
let shuffledQuestions, currentQuestionIndex;
// JavaScript code for the countdown timer
let timer = document.querySelector(".timer");
let timeLeft = 60; // 1 minute in seconds
let intervalId;
let score = 0;

startButton.addEventListener("click", () => {
  startGame();
  clearInterval(intervalId); // clear the previous interval
  intervalId = setInterval(updateTimer, 1000); // set a new interval
});
// startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timer.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  timeLeft--;
  if (timeLeft < 0) {
    clearInterval(intervalId);
    alert("Time is up!");
  }
}

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  scoreContainerElement.classList.add("hide");
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;
    setStatusClass(button, button.dataset.correct);
  });
  nextButton.classList.remove("hide");
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Try Again?";
    startButton.classList.remove("hide");
    nextButton.classList.add("hide");
    scoreContainerElement.classList.remove("hide");
    questionContainerElement.classList.add("hide");
    // Calculate and display the users score as X / Y and %
    const totalQuestions = questions.length;
    const scorePercentage = Math.round((score / totalQuestions) * 100);
    scoreElement.innerText = `Your score: ${score} / ${totalQuestions} (${scorePercentage}%)`;
    clearStatusClass(document.body);
  }
}

// function selectAnswer(e) {
//   const selectedButton = e.target;
//   const correct = selectedButton.dataset.correct;
//   setStatusClass(document.body, correct);
//   Array.from(answerButtonsElement.children).forEach((button) => {
//     button.disabled = true;
//     setStatusClass(button, button.dataset.correct);
//   });
//   nextButton.classList.remove("hide");
//   if (shuffledQuestions.length > currentQuestionIndex + 1) {
//     nextButton.classList.remove("hide");
//   } else {
//     startButton.innerText = "Try Again?";
//     startButton.classList.remove("hide");
//     nextButton.classList.add("hide");
//     scoreContainerElement.classList.remove("hide");
//     questionContainerElement.classList.add("hide");

//     clearStatusClass(document.body);
//   }
// }

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Tech Markup Language", correct: false },
      { text: "Hyper Tabular Markup Language", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false },
      { text: "Computer Style Sheets", correct: false },
    ],
  },
  {
    question: "What is the purpose of a CSS reset?",
    answers: [
      { text: "To eliminate browser inconsistencies", correct: true },
      { text: "To create a baseline for the page design", correct: false },
      { text: "To clear all styling rules from the page", correct: false },
      { text: "To reduce page loading times", correct: false },
    ],
  },
  {
    question: "Which tag is used to define a hyperlink?",
    answers: [
      { text: "img", correct: false },
      { text: "a", correct: true },
      { text: "div", correct: false },
      { text: "span", correct: false },
    ],
  },
  // {
  //   question: "What is a responsive website?",
  //   answers: [
  //     { text: "A website that loads quickly", correct: false },
  //     { text: "A website that is optimized for search engines", correct: false },
  //     { text: "A website that adapts to different screen sizes", correct: true },
  //     { text: "A website that is accessible to people with disabilities", correct: false },
  //   ],
  // },
  // {
  //   question: "What is the purpose of the alt attribute on an image tag?",
  //   answers: [
  //     { text: "To provide a title for the image", correct: false },
  //     { text: "To specify the width of the image", correct: false },
  //     { text: "To define a caption for the image", correct: false },
  //     { text: "To describe the image for screen readers", correct: true },
  //   ],
  // },
  // {
  //   question: "What is a CSS framework?",
  //   answers: [
  //     { text: "A collection of CSS styles that can be reused across a website", correct: true },
  //     { text: "A tool for optimizing website performance", correct: false },
  //     { text: "A set of rules for organizing HTML code", correct: false },
  //     { text: "A system for tracking user interactions on a website", correct: false },
  //   ],
  // },
  // {
  //   question: "What is the box model in CSS?",
  //   answers: [
  //     { text: "A way of organizing CSS styles using boxes", correct: false },
  //     { text: "A model for designing user interfaces", correct: false },
  //     { text: "A model for describing the layout of HTML elements", correct: true },
  //     { text: "A way of measuring page loading times", correct: false },
  //   ],
  // },
];
