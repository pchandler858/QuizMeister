const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const countElement = document.getElementById("question-count");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainerElement = document.getElementById("score-container");
const warning = document.getElementById("warning");
const timer = document.getElementById("timer");
const questionContainerElement = document.getElementById("question-container");
const scoreElement = document.getElementById("score");

let shuffledQuestions;
let currentQuestionIndex;
let timeLeft;
let intervalId;
let score;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", goToNextQuestion);

function startGame() {
  score = 0;
  timeLeft = 75; // Time limit: 5 seconds per question. 15 Questions.
  startButton.classList.add("hide");
  warning.classList.add("hide");
  timer.classList.add("timer");
  shuffledQuestions = questions.slice(0, 15).sort(() => Math.random() - 0.5); // Pick 15 random questions
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  stopTimer();
  intervalId = setInterval(updateTimer, 1000); // set a new interval
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function goToNextQuestion() {
  currentQuestionIndex++;
  setNextQuestion();
}

function showQuestion(question) {
  countElement.innerText = `Question ${currentQuestionIndex + 1} of 15`;
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
  } else if (timeLeft > 10) {
    timeLeft -= 10; // Deduct 10 seconds for each wrong answer
  } else {
    timeLeft = 0;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;
    if (button === selectedButton) {
      button.classList.add("selected-answer");
    }
    setStatusClass(button, button.dataset.correct);
  });
  nextButton.classList.remove("hide");
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    setTimeout(() => {
      alert(`Quiz completed! Click ok to check your score!`);
      endGame();
    }, 300);
  }
}

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

function endGame() {
  localStorage.setItem("mostRecentScore", JSON.stringify(score));
  startButton.innerText = "Try Again?";
  startButton.classList.remove("hide");
  nextButton.classList.add("hide");
  questionContainerElement.classList.add("hide");
  clearStatusClass(document.body);
  window.location.href = "end.html"; //navigate to score screen
  setTimeout(function () {
    location.reload();
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timer.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  timeLeft--;
  if (currentQuestionIndex === shuffledQuestions.length - 1) {
    stopTimer();
  } else if (timeLeft < -1) {
    stopTimer();
    timer.textContent = "0:00";
    alert(`Time's Up!!!!`);
    setTimeout(() => {
      endGame();
    }, 300); // Delay endGame() by 0.3 seconds so that the score does not populate right away
  }
}

function stopTimer() {
  clearInterval(intervalId);
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
  {
    question: "What is a responsive website?",
    answers: [
      { text: "A website that loads quickly", correct: false },
      {
        text: "A website that is optimized for search engines",
        correct: false,
      },
      {
        text: "A website that adapts to different screen sizes",
        correct: true,
      },
      {
        text: "A website that is accessible to people with disabilities",
        correct: false,
      },
    ],
  },
  {
    question: "What is the purpose of the alt attribute on an image tag?",
    answers: [
      { text: "To provide a title for the image", correct: false },
      { text: "To specify the width of the image", correct: false },
      { text: "To define a caption for the image", correct: false },
      { text: "To describe the image for screen readers", correct: true },
    ],
  },
  {
    question: "What is a CSS framework?",
    answers: [
      {
        text: "A collection of CSS styles that can be reused across a website",
        correct: true,
      },
      { text: "A tool for optimizing website performance", correct: false },
      { text: "A set of rules for organizing HTML code", correct: false },
      {
        text: "A system for tracking user interactions on a website",
        correct: false,
      },
    ],
  },
  {
    question: "What is the box model in CSS?",
    answers: [
      { text: "A way of organizing CSS styles using boxes", correct: false },
      { text: "A model for designing user interfaces", correct: false },
      {
        text: "A model for describing the layout of HTML elements",
        correct: true,
      },
      { text: "A way of measuring page loading times", correct: false },
    ],
  },
  {
    question: "What is the purpose of CSS?",
    answers: [
      { text: "To add interactivity to a webpage", correct: false },
      { text: "To structure and style content on a webpage", correct: true },
      { text: "To provide a database for a webpage", correct: false },
      { text: "To create dynamic animations on a webpage", correct: false },
    ],
  },
  {
    question: "What is the difference between margin and padding?",
    answers: [
      {
        text: "Margin adds space outside an element, while padding adds space inside an element",
        correct: true,
      },
      {
        text: "Margin adds space inside an element, while padding adds space outside an element",
        correct: false,
      },
      { text: "Margin and padding are the same thing", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What is a responsive website?",
    answers: [
      { text: "A website that can respond to user input", correct: false },
      {
        text: "A website that responds quickly to user actions",
        correct: false,
      },
      {
        text: "A website that adjusts its layout and content to fit different screen sizes",
        correct: true,
      },
      { text: "A website that can respond to user emotions", correct: false },
    ],
  },
  {
    question: "What is a CDN?",
    answers: [
      { text: "A database for storing website content", correct: false },
      { text: "A tool for testing website performance", correct: false },
      {
        text: "A service for delivering website content quickly to users around the world",
        correct: true,
      },
      {
        text: "A programming language used for web development",
        correct: false,
      },
    ],
  },
  {
    question: "What is the purpose of a media query in CSS?",
    answers: [
      { text: "To add interactivity to a webpage", correct: false },
      { text: "To structure and style content on a webpage", correct: false },
      {
        text: "To target specific devices or screen sizes with custom styles",
        correct: true,
      },
      { text: "To create dynamic animations on a webpage", correct: false },
    ],
  },
  {
    question: "What is a closure in JavaScript?",
    answers: [
      { text: "A function with no return statement", correct: false },
      {
        text: "A method that is called immediately after it is defined",
        correct: false,
      },
      {
        text: "A function that has access to variables in its outer lexical scope",
        correct: true,
      },
      { text: "A way to declare variables in JavaScript", correct: false },
    ],
  },
  {
    question: "What is the purpose of using event listeners in JavaScript?",
    answers: [
      { text: "To add styles to a webpage", correct: false },
      { text: "To create animations on a webpage", correct: false },
      { text: "To respond to user actions on a webpage", correct: true },
      { text: "To control the layout of a webpage", correct: false },
    ],
  },
  {
    question:
      "What is the difference between null and undefined in JavaScript?",
    answers: [
      { text: "They are the same thing", correct: false },
      { text: "Null is an object, while undefined is not", correct: false },
      {
        text: "Undefined means a variable has been declared but has not been assigned a value, while null is an assignment value that represents no value or no object",
        correct: true,
      },
      { text: "Undefined is an object, while null is not", correct: false },
    ],
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    answers: [
      {
        text: "== compares the values of two variables without type coercion, while === compares both the values and types of two variables",
        correct: true,
      },
      {
        text: "== compares the types of two variables, while === compares only the values of two variables",
        correct: false,
      },
      {
        text: "== and === are interchangeable and have the same behavior",
        correct: false,
      },
      {
        text: "== and === are deprecated in modern JavaScript",
        correct: false,
      },
    ],
  },
  {
    question:
      "What is the purpose of the 'use strict' directive in JavaScript?",
    answers: [
      { text: "To enable strict type checking in JavaScript", correct: false },
      {
        text: "To prevent the use of certain JavaScript keywords",
        correct: false,
      },
      {
        text: "To enforce stricter parsing and error handling rules in JavaScript",
        correct: true,
      },
      {
        text: "To enable new features introduced in the latest version of JavaScript",
        correct: false,
      },
    ],
  },
  {
    question: "What is the purpose of a doctype in HTML?",
    answers: [
      {
        text: "To specify the version of HTML used in the document",
        correct: true,
      },
      {
        text: "To specify the character encoding of the document",
        correct: false,
      },
      { text: "To specify the layout of the document", correct: false },
      { text: "To specify the title of the document", correct: false },
    ],
  },
  {
    question: "What is a responsive website design?",
    answers: [
      { text: "A design that adapts to different screen sizes", correct: true },
      { text: "A design that only works on mobile devices", correct: false },
      {
        text: "A design that includes animation and interactivity",
        correct: false,
      },
      { text: "A design that only works on desktop computers", correct: false },
    ],
  },
  {
    question: "What is a framework in web development?",
    answers: [
      {
        text: "A pre-built set of tools and libraries for building web applications",
        correct: true,
      },
      { text: "A design pattern used for creating web pages", correct: false },
      {
        text: "A set of rules for writing clean and maintainable code",
        correct: false,
      },
      { text: "A markup language used for creating web pages", correct: false },
    ],
  },
  {
    question: "What is the difference between GET and POST methods in HTTP?",
    answers: [
      {
        text: "GET requests data from a specified resource, while POST submits an entity to be processed",
        correct: true,
      },
      {
        text: "GET is used for creating new resources, while POST is used for updating existing resources",
        correct: false,
      },
      { text: "GET is more secure than POST", correct: false },
      {
        text: "There is no difference between GET and POST methods",
        correct: false,
      },
    ],
  },
  {
    question: "What is Bootstrap?",
    answers: [
      { text: "A programming language", correct: false },
      { text: "A CSS framework", correct: true },
      { text: "A database management system", correct: false },
      { text: "A server-side scripting language", correct: false },
    ],
  },
  {
    question: "What is the grid system used in Bootstrap?",
    answers: [
      { text: "12-column", correct: true },
      { text: "6-column", correct: false },
      { text: "8-column", correct: false },
      { text: "10-column", correct: false },
    ],
  },
  {
    question: "What is a navbar in Bootstrap?",
    answers: [
      { text: "A component for displaying tables", correct: false },
      { text: "A component for displaying forms", correct: false },
      { text: "A component for navigation menus", correct: true },
      { text: "A component for displaying images", correct: false },
    ],
  },
  {
    question: "What is Flexbox?",
    answers: [
      {
        text: "A layout model for arranging items within a container",
        correct: true,
      },
      {
        text: "A JavaScript library for building user interfaces",
        correct: false,
      },
      {
        text: "A CSS property for adding animations to elements",
        correct: false,
      },
      {
        text: "A programming language for developing web applications",
        correct: false,
      },
    ],
  },
  {
    question: "What are the main properties of Flexbox?",
    answers: [
      {
        text: "flex-direction, justify-content, align-items, and flex-wrap",
        correct: true,
      },
      {
        text: "background-color, font-size, padding, and margin",
        correct: false,
      },
      { text: "display, position, float, and width", correct: false },
      {
        text: "border-style, opacity, text-decoration, and cursor",
        correct: false,
      },
    ],
  },
  {
    question: "What is the default value for flex-direction?",
    answers: [
      { text: "row", correct: true },
      { text: "column", correct: false },
      { text: "row-reverse", correct: false },
      { text: "column-reverse", correct: false },
    ],
  },
  {
    question: "What is the purpose of justify-content?",
    answers: [
      { text: "To align items horizontally", correct: true },
      { text: "To align items vertically", correct: false },
      { text: "To change the direction of the flex container", correct: false },
      { text: "To wrap items onto multiple lines", correct: false },
    ],
  },
  {
    question: "What is the purpose of align-items?",
    answers: [
      { text: "To align items vertically", correct: true },
      { text: "To align items horizontally", correct: false },
      { text: "To change the direction of the flex container", correct: false },
      { text: "To wrap items onto multiple lines", correct: false },
    ],
  },
];
