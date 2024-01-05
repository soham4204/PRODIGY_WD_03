const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkWin();
  checkDraw();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s Turn`;
};

const checkWin = () => {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      message.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }
};

const checkDraw = () => {
  if (!gameState.includes('') && gameActive) {
    message.textContent = 'It\'s a draw!';
    gameActive = false;
  }
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  message.textContent = `Player ${currentPlayer}'s Turn`;

  cells.forEach((cell) => {
    cell.textContent = '';
  });
};

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
 