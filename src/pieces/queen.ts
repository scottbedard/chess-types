import type {
  Color,
  Index,
  ParsedGame,
} from '../base'

import type { Walk } from '../board'
import type { ToMoves } from '../utils'

export type QueenMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ...Walk<Game, Friendly, From, 0>,
  ...Walk<Game, Friendly, From, 1>,
  ...Walk<Game, Friendly, From, 2>,
  ...Walk<Game, Friendly, From, 3>,
  ...Walk<Game, Friendly, From, 5>,
  ...Walk<Game, Friendly, From, 6>,
  ...Walk<Game, Friendly, From, 7>,
  ...Walk<Game, Friendly, From, 8>,
], From>
