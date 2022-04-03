import React from 'react';

import Square from '../Square';
import RestartButton from '../RestartButton';

import { initState, possibleWins } from './const';
import type {TBoard, TCellValue, IApplicationState} from '../types';

class Board extends React.Component<{}, IApplicationState> {
  constructor(props: {}) {
    super(props);
    this.state = initState;
  }

  clickOnSquare(x: number, y: number) {
    if (this.state.winner !== '') {
      return;
    }

    if (this.getValueOfCellFromBoard(x, y, this.state.board) !== '') {
      return;
    }

    this.setState((prevState) => {
      const prevBoard = prevState.board;

      const cloneBoard =[[...prevBoard[0]], [...prevBoard[1]], [...prevBoard[2]]];

      cloneBoard[y][x] = prevState.turn % 2 === 0 ? 'X' : 'O';

      return {
        turn: prevState.turn + 1,
        board: cloneBoard,
        winner: prevState.winner
      }
    });

    this.setState((prevState) => {
      let winner: TCellValue = '';

      if (this.checkForEndGame(prevState.board)) {
        winner = prevState.turn % 2 === 0 ? 'O' : 'X';
      }

      return {
        ...prevState,
        winner
      }
    })
  }

  getValueOfCellFromBoard(x: number, y: number, board: TBoard) {
    return board[y][x];
  }

  checkForEndGame(board: TBoard): boolean {
    return possibleWins.some((el) => {
      const values = [0, 1, 2].map((index) => this.getValueOfCellFromBoard(el[index].y, el[index].x, board));

      if (values[0] === '') {
        return false;
      }

      return values[0] === values[1] && values[1] === values[2];
    })
  }

  getStatusOfGame() {
    let status;

    if (this.state.winner) {
      status = `Game is Ended. Winner is ${this.state.winner}`;
    } else if (this.state.turn === 9) {
      status = `Game is Ended. Tie`;
    } else {
      status = this.state.turn % 2 === 0 ? 'Next player: X' : 'Next player: O'
    }

    return status;
  }

  isGameEnded() {
    return this.state.winner !== '' || this.state.turn === 9;
  }

  restartGame() {
    this.setState(initState);
  }

  render() {
    return (
      <div>
        <div className="status">{this.getStatusOfGame()}</div>
        {
          [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((row, y) => {
            return (
              <div className="board-row" key={y}>
                {row.map((cell, x) => {
                  return (
                    <Square
                      value={this.getValueOfCellFromBoard(x, y, this.state.board)}
                      click={this.clickOnSquare.bind(this, x, y)}
                      key={cell}
                    />
                  )
                })}
              </div>
            )
          })
        }
        <RestartButton display={this.isGameEnded()} restart={() => this.restartGame()}/>
      </div>
    );
  }
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>
);

export default Game;
