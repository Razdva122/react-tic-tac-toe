import { useEffect, useState } from 'react';

import Square from '../Square';
import RestartButton from '../RestartButton';

import { initState, possibleWins, STORAGE_KEY } from './const';
import type { TBoard, TCellValue, IApplicationState } from '../types';

function Board() {
  const [state, updateState] = useState<IApplicationState>(initState);
  const [isLoading, updateLoadingState] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      setTimeout(() => {
        const storageState = localStorage.getItem(STORAGE_KEY);
        updateLoadingState(false);

        if (storageState) {
          updateState(JSON.parse(storageState));
        } else {
          updateState(initState);
        }
      }, 5000);
    }
  });

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
    if (state.winner) {
      return `Game is Ended. Winner is ${state.winner}`;
    } else if (state.turn === 9) {
      return `Game is Ended. Tie`;
    } else {
      return state.turn % 2 === 0 ? 'Next player: X' : 'Next player: O'
    }
  }

  function restartGame() {
    updateState(initState);
  }

  if (isLoading) {
    return (
      <div>
        <div className="status">Game is loading</div>
      </div>
    )
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
      <RestartButton restart={restartGame}/>
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
