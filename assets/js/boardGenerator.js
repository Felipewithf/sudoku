function shuffle(array) {
  // Shuffle an array using the Fisher-Yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isValid(board, row, col, num) {
  // Check if the number can be placed in the given row and column
  for (let i = 0; i < 9; i++) {
    if (
      board[row][i] === num ||
      board[i][col] === num ||
      board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
        3 * Math.floor(col / 3) + (i % 3)
      ] === num
    ) {
      return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        const nums = Array.from({ length: 9 }, (_, index) => index + 1);
        shuffle(nums);

        for (const num of nums) {
          if (isValid(board, i, j, num)) {
            board[i][j] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSudokuBoard() {
  // Create an empty 9x9 Sudoku board
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Fill the board with a complete Sudoku solution
  solveSudoku(board);

  // Remove numbers to create a puzzle (adjust the range for the desired difficulty)
  for (let k = 0; k < 10; k++) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    while (board[row][col] === 0) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }
    board[row][col] = 0;
  }

  // Flatten the 2D array into a 1D array
  const flatBoard = board.flat();

  return flatBoard;
}

console.log(generateSudokuBoard());
