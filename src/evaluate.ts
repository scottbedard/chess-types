import type {
  Color,
  Index,
  Indices,
  ParsedGame,
  ParsedMove,
  Piece,
} from './base'

import type { _ApplyMoveUnsafe, _CurrentMoves } from './game'

import type { Sum } from './utils'

/**
 * Get the next move
 */
export type _SearchLayer<
  Game extends ParsedGame,
  Turn extends Color = Game['turn'],
  Moves extends ParsedMove[] = _CurrentMoves<Game, Turn>,
  Result extends number[] = []
> = Moves extends [infer Head extends ParsedMove, ...infer Tail extends ParsedMove[]]
  ? _ApplyMoveUnsafe<Game, Head> extends infer NextGame extends ParsedGame
    ? _SearchLayer<NextGame, Turn, Tail, [Evaluate<NextGame>, ...Result]>
    : 1
  : Result

/**
 * Evaluate game state
 */
export type Evaluate<
  Game extends ParsedGame,
  Value extends number = 0,
  Remaining extends Index[] = Indices
> = Remaining extends [infer Head extends Index, ...infer Tail extends Index[]]
  ? Game['board'][Head] extends infer P extends Piece
    ? Evaluate<Game, Sum<Value, _PieceValue[P]>, Tail>
    : Evaluate<Game, Value, Tail>
  : Value

type _PieceValue = {
  'k': -90
  'q': -9
  'r': -5
  'b': -3
  'n': -3
  'p': -1
  'P': 1
  'N': 3
  'B': 3
  'R': 5
  'Q': 9
  'K': 90
}
