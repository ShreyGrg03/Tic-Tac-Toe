import { useState } from "react";
import "./App.css";

function App() {
  // Game state
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // Function to handle a square click
  const handleClick = (i) => {
    // If square is already filled or game is over, ignore the click
    if (squares[i] || gameOver) return;

    // Create a copy of the squares array
    const newSquares = squares.slice();
    // Set the value of the clicked square
    newSquares[i] = xIsNext ? "X" : "O";
    
    // Update the game state
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    // Check for a winner
    const winner = calculateWinner(newSquares);
    if (winner) {
      setGameOver(true);
    } else if (newSquares.every(square => square !== null)) {
      // If all squares are filled and no winner, it's a draw
      setGameOver(true);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
  };

  // Function to calculate the winner
  const calculateWinner = (squares) => {
    // All possible winning combinations
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ];

    // Check each winning combination
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Determine game status
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square !== null)) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // Render the square component
  const Square = ({ value, onClick }) => {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      
      <div className="game-status">{status}</div>
      
      <div className="game-board">
        <div className="board-row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;