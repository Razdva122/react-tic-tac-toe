import React, { useState } from 'react';

import Square from '../Square';
import RestartButton from '../RestartButton';

import { initState, possibleWins } from './const';
import type {TBoard, TCellValue} from '../types';

function Board() {
  const [state, updateState] = useState(initState);

  function getValueOfCellFromBoard(x: number, y: number, board: TBoard) {
    return board[y][x];
  }

  function clickOnSquare(x: number, y: number) {
    if (state.winner !== '') {
      return;
    }

    if (getValueOfCellFromBoard(x, y, state.board) !== '') {
      return;
    }

    updateState((prevState) => {
      const prevBoard = prevState.board;

      const cloneBoard =[[...prevBoard[0]], [...prevBoard[1]], [...prevBoard[2]]];

      cloneBoard[y][x] = prevState.turn % 2 === 0 ? 'X' : 'O';

      return {
        turn: prevState.turn + 1,
        board: cloneBoard,
        winner: prevState.winner
      }
    });

    updateState((prevState) => {
      let winner: TCellValue = '';

      if (checkForEndGame(prevState.board)) {
        winner = prevState.turn % 2 === 0 ? 'O' : 'X';
      }

      return {
        ...prevState,
        winner
      }
    })
  }

  function checkForEndGame(board: TBoard): boolean {
    return possibleWins.some((el) => {
      const values = [0, 1, 2].map((index) => getValueOfCellFromBoard(el[index].y, el[index].x, board));

      if (values[0] === '') {
        return false;
      }

      return values[0] === values[1] && values[1] === values[2];
    })
  }

  function getStatusOfGame() {
    let status;

    if (state.winner) {
      status = `Game is Ended. Winner is ${state.winner}`;
    } else if (state.turn === 9) {
      status = `Game is Ended. Tie`;
    } else {
      status = state.turn % 2 === 0 ? 'Next player: X' : 'Next player: O'
    }

    return status;
  }

  function isGameEnded() {
    return state.winner !== '' || state.turn === 9;
  }

  function restartGame() {
    updateState(initState);
  }

  return (
    <div>
      <div className="status">{getStatusOfGame()}</div>
      {
        state.board.map((row, y) => {
          return (
            <div className="board-row" key={y}>
              {row.map((value, x) => {
                return (
                  <Square
                    value={value}
                    click={clickOnSquare.bind(null, x, y)}
                    key={x}
                  />
                )
              })}
            </div>
          )
        })
      }
      <RestartButton display={isGameEnded()} restart={restartGame}/>
    </div>
  );
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>
);

export default Game;
