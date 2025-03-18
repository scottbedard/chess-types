import type { Color, FriendlyPiece, ParsedGame } from '@/chess'
import type { Graph, Index } from '@/board'
import type { ToMoves } from './shared'

export type KingMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ..._KingStep<Game, Friendly, From, 0>,
  ..._KingStep<Game, Friendly, From, 1>,
  ..._KingStep<Game, Friendly, From, 2>,
  ..._KingStep<Game, Friendly, From, 3>,
  ..._KingStep<Game, Friendly, From, 5>,
  ..._KingStep<Game, Friendly, From, 6>,
  ..._KingStep<Game, Friendly, From, 7>,
  ..._KingStep<Game, Friendly, From, 8>,
], From>

export type _KingStep<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8,
> = Graph[From][Direction] extends infer To extends Index
  ? Game['board'][To] extends FriendlyPiece<Friendly>
    ? []
    : [To]
  : []
