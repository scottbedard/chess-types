import type { Color, FriendlyPiece, ParsedGame } from '@/chess'
import type { Graph, Index } from '@/board'

export type KnightMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = [
  ..._KnightStep<Game, Friendly, From, 0, 1>,
  ..._KnightStep<Game, Friendly, From, 0, 3>,
  ..._KnightStep<Game, Friendly, From, 2, 1>,
  ..._KnightStep<Game, Friendly, From, 2, 5>,
  ..._KnightStep<Game, Friendly, From, 6, 3>,
  ..._KnightStep<Game, Friendly, From, 6, 7>,
  ..._KnightStep<Game, Friendly, From, 8, 5>,
  ..._KnightStep<Game, Friendly, From, 8, 7>,
]

type _KnightStep<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  DiagonalDirection extends 0 | 2 | 6 | 8,
  OrthogonalDirection extends 1 | 3 | 5 | 7,
> = Graph[From][DiagonalDirection] extends infer To extends Index
  ? Graph[To][OrthogonalDirection] extends infer Next extends Index
    ? Game['board'][Next] extends FriendlyPiece<Friendly>
      ? []
      : [Next]
    : []
  : []
