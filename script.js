// variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'player1';
let winner = null;

// board cells
const cells = document.querySelectorAll('.cell');

// winner message
const winnerMessage = document.getElementById('winner');

// restart button
const restartButton = document.getElementById('restart');

// event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);

// functions
function handleCellClick() {
    const cell = this;
    const cellIndex = parseInt(cell.id);

    if (board[cellIndex] !== '' || winner !== null) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer === 'player1' ? 'X' : 'O';

    checkWinner();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            displayWinner();
            highlightWinningCombo(a, b, c);
            break;
        }
    }

    if (!board.includes('')) {
        winner = 'draw';
        displayWinner();
    }
}

function displayWinner() {
    if (winner === 'draw') {
        winnerMessage.textContent = 'It\'s a draw!';
    } else {
        winnerMessage.textContent = `${winner === 'player1' ? 'X' : 'O'} wins!`;
    }
}

function highlightWinningCombo(a, b, c) {
    const winningCells = [cells[a], cells[b], cells[c]];
    winningCells.forEach(cell => cell.classList.add('winner'));
}

function handleRestartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'player1';
    winner = null;
    cells.forEach(cell => {
        cell.classList.remove('player1', 'player2', 'winner');
        cell.textContent = '';
    });
    winnerMessage.textContent = '';
}
