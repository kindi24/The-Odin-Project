// Gameboard
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    // Copy of board
    const getBoard = () => [...board];

    // Place a mark function
    const placeMark = (index, mark) => {
        // Check for valid position
        if (index >= 0 && index < 9 && board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    // We only return methods that are needed externally
    return { getBoard, placeMark, resetBoard };
})();


// Player
const Player = (name, mark) => {
    return { name, mark };
};

// GameController
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]             
    ];

    // Initialize Game with players names
    const initializeGame = (player1Name, player2Name) => {
        players = [
            Player(player1Name, "X"),
            Player(player2Name, "O")
        ];
        currentPlayerIndex = 0;
        isGameOver = false;
        Gameboard.resetBoard(); // Board clearance
        // Message for the start of game
        return `${players[currentPlayerIndex].name} starts with 'X'.`;
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    // Check for the winner
    const checkForWinner = (board) => {
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (
                board[a] !== "" &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                isGameOver = true;
                return players.find(p => p.mark === board[a]); // Returns the winner
            }
        }
        return null; // No winner
    };

    // Tie case
    const checkForTie = (board) => {
        return board.every(cell => cell !== "");
    };

    // Main function of game
    const playRound = (index) => {
        if (isGameOver) {
            return "The game is over.";
        }

        const currentPlayer = getCurrentPlayer();
        const mark = currentPlayer.mark;

        const successfulPlacement = Gameboard.placeMark(index, mark);

        if (successfulPlacement) {
            const currentBoard = Gameboard.getBoard();
            const winner = checkForWinner(currentBoard);

            if (winner) {
                isGameOver = true;
                return `${winner.name} (with ${winner.mark}) won!`;
            } else if (checkForTie(currentBoard)) {
                isGameOver = true;
                return "Draw!";
            } else {
                // Change Player
                currentPlayerIndex = 1 - currentPlayerIndex;
                return `${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].mark}).`;
            }
        } else {
            return "This position is already filled or invalid.";
        }
    };

    // Back to Basic Methods
    return {
        initializeGame,
        playRound,
        getBoard: Gameboard.getBoard,
        getIsGameOver: () => isGameOver,
        getCurrentPlayerMark: () => getCurrentPlayer() ? getCurrentPlayer().mark : null,
    };
})();

// DisplayController
const DisplayController = (() => {
    const boardElement = document.getElementById('gameboard');
    const messageElement = document.getElementById('message');
    const formElement = document.getElementById('player-form');
    const startButton = document.getElementById('start-button');

    const renderBoard = () => {
        boardElement.innerHTML = "";
        const board = GameController.getBoard();

        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.setAttribute('data-index', index);
            cellElement.textContent = cell;
            cellElement.addEventListener('click', handleCellClick);
            boardElement.appendChild(cellElement);
        });
    };

    // Handle Click
    function handleCellClick(e) {
        if (GameController.getIsGameOver()) return;

        const index = parseInt(e.target.dataset.index);
        const gameStatusMessage = GameController.playRound(index);

        updateDisplay(gameStatusMessage);
    }

    // Update Message
    const updateDisplay = (message) => {
        renderBoard();
        messageElement.textContent = message;

        // Check if the game is finished to enable/disable 'New Game' button
        const isGameOver = GameController.getIsGameOver();
        startButton.disabled = !isGameOver;
    };

    // Handle form
    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        const player1Name = document.getElementById('player1-name').value || "Player 1";
        const player2Name = document.getElementById('player2-name').value || "Player 2";

        const startMessage = GameController.initializeGame(player1Name, player2Name);    
        updateDisplay(startMessage);
        
        boardElement.classList.remove('hidden');
    };

    const init = () => {
        formElement.addEventListener('submit', handleFormSubmit);
        renderBoard();
        messageElement.textContent = "Fill in the names and press New Game.";
        boardElement.classList.add('hidden');

        // Set 'New Game' button as enabled 
        startButton.disabled = false;
    };

    return { init };
})();

document.addEventListener('DOMContentLoaded', DisplayController.init);