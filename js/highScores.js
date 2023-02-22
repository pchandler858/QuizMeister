const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", function () {
  window.location.href = "../index.html";
});

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class="high-score">${score.name}:  ${score.score}</li>`;
  })
  .join("");
