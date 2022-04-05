export type TCellValue = '' | 'X' | 'O';

export type TBoard = Array<Array<TCellValue>>

export interface IApplicationState {
  turn: number;
  board: TBoard;
  winner: TCellValue;
}
