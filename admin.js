document.getElementById("question-form").addEventListener("submit", function(event) {
  event.preventDefault();

  let question = document.getElementById("question").value;
  let options = [
    document.getElementById("option1").value,
    document.getElementById("option2").value,
    document.getElementById("option3").value,
    document.getElementById("option4").value
  ];
  let answer = document.getElementById("answer").value;

  let newQuestion = { question, options, answer };

  // Retrieve existing questions or create empty array
  let storedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
  storedQuestions.push(newQuestion);

  // Save updated questions list to localStorage
  localStorage.setItem("questions", JSON.stringify(storedQuestions));

  alert("Question Added!");
  document.getElementById("question-form").reset();
  loadQuestions();
});

// Function to load and display questions
function loadQuestions() {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let questionList = document.getElementById("questions-list");
  questionList.innerHTML = ""; // Clear previous list

  questions.forEach((q, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span><strong>Q${index + 1}:</strong> ${q.question}</span>
      <div>
        <button class="edit-btn" onclick="editQuestion(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteQuestion(${index})">🗑️</button>
      </div>
    `;
    questionList.appendChild(li);
  });
}


// Function to edit a question (Full Edit: Question, Options, Answer)
function editQuestion(index) {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let q = questions[index];

  let newQuestion = prompt("Edit Question:", q.question);
  if (newQuestion === null) return;

  let newOptions = [
    prompt("Edit Option A:", q.options[0]),
    prompt("Edit Option B:", q.options[1]),
    prompt("Edit Option C:", q.options[2]),
    prompt("Edit Option D:", q.options[3])
  ];
  let newAnswer = prompt("Enter Correct Answer (1-4):", q.answer);

  if (newOptions.includes(null) || newAnswer === null) return;

  questions[index] = { question: newQuestion, options: newOptions, answer: newAnswer };
  localStorage.setItem("questions", JSON.stringify(questions));
  loadQuestions(); // Refresh the list
}

// Function to delete a question
function deleteQuestion(index) {
  let questions = JSON.parse(localStorage.getItem("questions")) || [];
  let confirmDelete = confirm(`Are you sure you want to delete:\n"${questions[index].question}"?`);

  if (confirmDelete) {
    questions.splice(index, 1); // Remove question
    localStorage.setItem("questions", JSON.stringify(questions));
    loadQuestions(); // Refresh the list
  }
}

// Load questions on page load
window.onload = function() {
  let password = prompt("Enter Admin Password:");
  const correctPassword = "admin123";

  if (password !== correctPassword) {
    alert("Incorrect Password! Redirecting...");
    window.location.href = "index.html";
  } else {
    loadQuestions(); // Load questions when admin logs in
  }
};
// Block Right-Click
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});

// Block F12, Ctrl+Shift+I, and Ctrl+U
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 123 ||
    (event.ctrlKey && event.shiftKey && event.keyCode == 73) ||
    (event.ctrlKey && event.keyCode == 85)) {
    event.preventDefault();
  }
});
