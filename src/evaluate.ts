import type {
  Index,
  Indices,
  ParsedGame,
  ParsedMove,
  Piece,
} from './base'

import type {
  _ApplyMoveUnsafe,
  _CurrentMoves,
} from './game'

import {
  FormatSan,
} from './notation'

import type {
  IsGreater,
  Sum
} from './utils'

/**
 * Get the next move
 */
export type NextMove<Game extends ParsedGame> = Game['turn'] extends 'w'
  ? _Max<_Layer<Game>> extends infer Node extends _Node
    ? FormatSan<Node['move']>
    : never
  : _Min<_Layer<Game>> extends infer Node extends _Node
    ? FormatSan<Node['move']>
    : never

type _Node = {
  move: ParsedMove
  score: number
}

type _Layer<
  Game extends ParsedGame,
  Moves extends ParsedMove[] = _CurrentMoves<Game>,
  Acc extends _Node[] = []
> = Moves extends [infer Head extends ParsedMove, ...infer Tail extends ParsedMove[]]
  ? _Layer<Game, Tail, [...Acc, {
    move: Head,
    score: Evaluate<_ApplyMoveUnsafe<Game, Head>>
  }]>
  : Acc

type _Max<
  Nodes extends _Node[],
  Best extends _Node | false = false
> = Nodes extends [infer Head extends _Node, ...infer Tail extends _Node[]]
  ? Best extends infer B extends _Node
    ? IsGreater<Head['score'], B['score']> extends true
      ? _Max<Tail, Head>
      : _Max<Tail, Best>
    : _Max<Tail, Head>
  : Best

type _Min<
  Nodes extends _Node[],
  Best extends _Node | false = false
> = Nodes extends [infer Head extends _Node, ...infer Tail extends _Node[]]
  ? Best extends infer B extends _Node
    ? IsGreater<Head['score'], B['score']> extends true
      ? _Min<Tail, Best>
      : _Min<Tail, Head>
    : _Min<Tail, Head>
  : Best

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
