const gameUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/2ag8QvxcyAjEtOo0qNyP/scores/';

const addScore = async (name, score) => {
  await fetch(gameUrl, {
    method: 'POST',
    body: JSON.stringify({
      user: name,
      score,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

const displayScores = (scores) => {
  const table = document.createElement('table');
  const tableDiv = document.getElementById('table');
  tableDiv.innerHTML = '';

  scores.forEach((item) => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.textContent = item.user;
    const scoreCell = document.createElement('td');
    scoreCell.textContent = item.score;
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    table.appendChild(row);
  });

  tableDiv.appendChild(table);
};

const submitForm = document.querySelector('.fill-score');
const errorElement = document.getElementById('error-message');
submitForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const name = nameInput.value;
  const score = scoreInput.value;

  if (name.trim() === '' || score.trim() === '') {
    errorElement.textContent = 'Please enter both name and score.';
    return;
  }

  errorElement.textContent = '';

  addScore(name, score);
  nameInput.value = '';
  scoreInput.value = '';
});

const refreshButton = document.querySelector('.refresh-btn');
refreshButton.addEventListener('click', async () => {
  const response = await fetch(gameUrl);
  const data = await response.json();
  const scores = data.result;
  displayScores(scores);
});

const refreshScores = async () => {
  const response = await fetch(gameUrl);
  const data = await response.json();
  const scores = data.result;
  displayScores(scores);
};

refreshScores();