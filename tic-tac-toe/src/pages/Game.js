import { useState } from 'react';
import styled from 'styled-components';
import { VscChromeClose } from "react-icons/vsc";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 색상 및 투명도 조절 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소들보다 위에 나타나도록 설정 */
`;

const Background = styled.div`
  display: flex;
  background-color: #3E5151;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const TicTacToe = styled.p`
  position: fixed;
  font-size: 80px;
  font-weight: 900;
  line-height: 0.3;
  color: #DECBA4;
  left: 32%;
  text-align: center;
`;

const PopupContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #d3d3d3;
  padding: 20px;
  margin-top: 50px;
  width: 600px;
  height: 400px;
  border-radius: 20px;
`;

const PopupText = styled.p`
  font-size: 70px; 
  font-weight: 800;
  line-height: 0;
  color: #392f31;
  margin-bottom: 10px;
`;

const PopupText2 = styled.p`
  font-size: 100px; 
  font-weight: 800;
  line-height: 0;
  color: #392f31;
`;

const Button = styled.button`
  align-self: flex-end;
  margin-top: -60px;
  margin-left: -40px;
  color:  #392f31;
  padding: 10px 10px;
  cursor: pointer; 
  font-size: 30px;
  border: 0; 
  background: none;
  padding-bottom: 50px; 
`;

function Sqaure({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Popup({ winner, onClose }) {
  return (
    <Overlay>
      <PopupContent>
        <Button onClick={onClose}>
          <VscChromeClose />
        </Button>
        <PopupText>WINNER!</PopupText>
        <PopupText2>{winner}</PopupText2>
      </PopupContent>
    </Overlay>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Sqaure value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Sqaure value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Sqaure value={squares[2]} onSquareClick={() => handleClick(2)}  />   
      </div>
      <div className="board-row">
        <Sqaure value={squares[3]} onSquareClick={() => handleClick(3)}  />
        <Sqaure value={squares[4]} onSquareClick={() => handleClick(4)}  />
        <Sqaure value={squares[5]} onSquareClick={() => handleClick(5)}  />   
      </div>
      <div className="board-row">
        <Sqaure value={squares[6]} onSquareClick={() => handleClick(6)}  />
        <Sqaure value={squares[7]} onSquareClick={() => handleClick(7)}  />
        <Sqaure value={squares[8]} onSquareClick={() => handleClick(8)}  />   
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);

    const newWinner = calculateWinner(nextSquares);
    if (newWinner) {
      setWinner(newWinner);
    }
  }

  function handlePopupClose() {
    setWinner(null);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <> 
      {winner && <Popup winner={winner} onClose={handlePopupClose} />}
      <TicTacToe>TIC.TAC,TOE</TicTacToe>
      <Background>
        <div className='game'>
          <div className='game-board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className='game-info'>
            <ol>{moves}</ol>
          </div>
        </div>
      </Background>
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}