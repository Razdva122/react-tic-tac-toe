import type {TCellValue} from '../types';

export default function Square({click, value}: {click: () => void, value: TCellValue}) {
  return (
    <button className="square" onClick={click}>
      {value}
    </button>
  )
}