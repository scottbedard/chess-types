/* eslint-disable @stylistic/no-multi-spaces */
import { IsOdd } from './utils'
import { ParsedGame, Piece, Index } from './base'

/** create a debuggable representation of the chessboard */
export type Render<T extends ParsedGame> = {
  8: [` ${_W<T,  0>} ${_W<T,  1>} ${_W<T,  2>} ${_W<T,  3>} ${_W<T,  4>} ${_W<T,  5>} ${_W<T,  6>} ${_W<T,  7>} `],
  7: [` ${_B<T,  8>} ${_B<T,  9>} ${_B<T, 10>} ${_B<T, 11>} ${_B<T, 12>} ${_B<T, 13>} ${_B<T, 14>} ${_B<T, 15>} `],
  6: [` ${_W<T, 16>} ${_W<T, 17>} ${_W<T, 18>} ${_W<T, 19>} ${_W<T, 20>} ${_W<T, 21>} ${_W<T, 22>} ${_W<T, 23>} `],
  5: [` ${_B<T, 24>} ${_B<T, 25>} ${_B<T, 26>} ${_B<T, 27>} ${_B<T, 28>} ${_B<T, 29>} ${_B<T, 30>} ${_B<T, 31>} `],
  4: [` ${_W<T, 32>} ${_W<T, 33>} ${_W<T, 34>} ${_W<T, 35>} ${_W<T, 36>} ${_W<T, 37>} ${_W<T, 38>} ${_W<T, 39>} `],
  3: [` ${_B<T, 40>} ${_B<T, 41>} ${_B<T, 42>} ${_B<T, 43>} ${_B<T, 44>} ${_B<T, 45>} ${_B<T, 46>} ${_B<T, 47>} `],
  2: [` ${_W<T, 48>} ${_W<T, 49>} ${_W<T, 50>} ${_W<T, 51>} ${_W<T, 52>} ${_W<T, 53>} ${_W<T, 54>} ${_W<T, 55>} `],
  1: [` ${_B<T, 56>} ${_B<T, 57>} ${_B<T, 58>} ${_B<T, 59>} ${_B<T, 60>} ${_B<T, 61>} ${_B<T, 62>} ${_B<T, 63>} `],
}

type _B<Game extends ParsedGame,I extends Index> =
  Game['board'][I] extends infer U extends Piece ? U : IsOdd<I> extends true ? '*' : '-'

type _W<Game extends ParsedGame, I extends Index> =
  Game['board'][I] extends infer U extends Piece ? U : IsOdd<I> extends true ? '-' : '*'
