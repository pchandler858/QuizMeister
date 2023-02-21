const takeQuizBtn = document.getElementById("takeQuiz-btn");
const highScoresBtn = document.getElementById("highScores-btn");

takeQuizBtn.addEventListener("click", function () {
  window.location.href = "quiz.html";
});
highScoresBtn.addEventListener("click", function () {
  window.location.href = "highScores.html";
});
