// Get questions from localStorage
const quizData = JSON.parse(localStorage.getItem("questions")) || [];

if (quizData.length === 0) {
  alert("No questions found! Add questions in Admin Panel.");
  window.location.href = "admin.html"; // Redirect to admin page
}

// Quiz variables
let qIndex = 0;
let score = 0;

// Load question
function showQ() {
  if (qIndex >= quizData.length) {
    alert(`Quiz Over! Score: ${score}/${quizData.length}`);
    window.location.href = "index.html"; // Redirect to home
    return;
  }

  let q = quizData[qIndex];
  document.getElementById("ques").innerText = q.question;

  let opts = document.querySelectorAll(".opt");
  opts.forEach((btn, i) => {
    btn.innerText = q.options[i];
    btn.onclick = () => checkAns(i + 1);
  });
}

// Check answer
function checkAns(selected) {
  if (selected == quizData[qIndex].answer) {
    score++;
  }
  qIndex++;
  showQ();
}

// Start quiz
document.addEventListener("DOMContentLoaded", showQ);
