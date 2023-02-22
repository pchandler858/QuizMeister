const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScore-btn");
const tryAgainButton = document.getElementById("start-btn");
const homeBtn = document.getElementById("home-btn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
// const scorePercentage = Math.round((mostRecentScore / 15) * 100);

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScores = 5;
console.log(highScores);

homeBtn.addEventListener("click", function () {
  window.location.href = "/index.html";
});

tryAgainButton.addEventListener("click", function () {
  window.location.href = "/html/quiz.html";
});

const scorePercentage = Math.round((mostRecentScore / 15) * 100);
finalScore.innerText = `${mostRecentScore} out of 15 - (${scorePercentage}%)`;

// finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

function saveHighScore(e) {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value,
  };
  highScores.push(score);

  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/html/highScores.html");
}
