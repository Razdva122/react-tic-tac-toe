export type TCellValue = '' | 'X' | 'O';

export type TBoard = Array<Array<TCellValue>>

export interface IApplicationState {
  isLoading: boolean;
  turn: number;
  board: TBoard;
  winner: TCellValue;
}
