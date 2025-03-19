import { IsOdd } from '@/utils'
import { ParsedGame, Piece, Index } from '@/base'

export type _DisplayGame<T extends ParsedGame> = {
  8: [` ${_Light<T, 0>} ${_Light<T, 1>} ${_Light<T, 2>} ${_Light<T, 3>} ${_Light<T, 4>} ${_Light<T, 5>} ${_Light<T, 6>} ${_Light<T, 7>} `],
  7: [` ${_Dark<T, 8>} ${_Dark<T, 9>} ${_Dark<T, 10>} ${_Dark<T, 11>} ${_Dark<T, 12>} ${_Dark<T, 13>} ${_Dark<T, 14>} ${_Dark<T, 15>} `],
  6: [` ${_Light<T, 16>} ${_Light<T, 17>} ${_Light<T, 18>} ${_Light<T, 19>} ${_Light<T, 20>} ${_Light<T, 21>} ${_Light<T, 22>} ${_Light<T, 23>} `],
  5: [` ${_Dark<T, 24>} ${_Dark<T, 25>} ${_Dark<T, 26>} ${_Dark<T, 27>} ${_Dark<T, 28>} ${_Dark<T, 29>} ${_Dark<T, 30>} ${_Dark<T, 31>} `],
  4: [` {_Light<T, 32>} ${_Light<T, 33>} ${_Light<T, 34>} ${_Light<T, 35>} ${_Light<T, 36>} ${_Light<T, 37>} ${_Light<T, 38>} ${_Light<T, 39>} `],
  3: [` ${_Dark<T, 40>} ${_Dark<T, 41>} ${_Dark<T, 42>} ${_Dark<T, 43>} ${_Dark<T, 44>} ${_Dark<T, 45>} ${_Dark<T, 46>} ${_Dark<T, 47>} `],
  2: [` ${_Light<T, 48>} ${_Light<T, 49>} ${_Light<T, 50>} ${_Light<T, 51>} ${_Light<T, 52>} ${_Light<T, 53>} ${_Light<T, 54>} ${_Light<T, 55>} `],
  1: [` ${_Dark<T, 56>} ${_Dark<T, 57>} ${_Dark<T, 58>} ${_Dark<T, 59>} ${_Dark<T, 60>} ${_Dark<T, 61>} ${_Dark<T, 62>} ${_Dark<T, 63>} `],
}

type _Dark<
  Game extends ParsedGame,
  I extends Index
> = Game['board'][I] extends infer U extends Piece
  ? U : IsOdd<I> extends true ? '*' : '-'

type _Light<
  Game extends ParsedGame,
  I extends Index
> = Game['board'][I] extends infer U extends Piece
  ? U : IsOdd<I> extends true ? '-' : '*'
