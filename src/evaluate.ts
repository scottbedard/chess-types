import type {
  Color,
  Index,
  Indices,
  ParsedGame,
  ParsedMove,
  Piece,
} from './base'

import type {
  _ApplyMoveUnsafe,
  _CurrentMoves,
  Chessboard,
  NewGame
} from './game'

import type {
  FormatGame,
  FormatSan,
  ParseFen
} from './notation'

import type { Sum } from './utils'

/**
 * Get the next move
 */
type _Node = {
  move: string
  fen: string
  score: number
}

type _Layer<
  Game extends ParsedGame,
  Moves extends ParsedMove[] = _CurrentMoves<Game>,
  Acc extends _Node[] = []
> = Moves extends [infer Head extends ParsedMove, ...infer Tail extends ParsedMove[]]
  ? _Layer<Game, Tail, [...Acc, {
    move: FormatSan<Head>,
    fen: FormatGame<_ApplyMoveUnsafe<Game, Head>>
    score: Evaluate<_ApplyMoveUnsafe<Game, Head>>
  }]>
  : Acc

type Game = ParseFen<'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2'>

type Foo = _Layer<Game>

type Output = Chessboard<Game>

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

type _EvaluateMove<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Evaluate<_ApplyMoveUnsafe<Game, Move>>

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
