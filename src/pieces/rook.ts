import type {
  Color,
  Index,
  ParsedGame,
} from '../base'

import type { Walk } from '../board'
import type { ToMoves } from '../utils'

export type RookMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ...Walk<Game, Friendly, From, 1>,
  ...Walk<Game, Friendly, From, 3>,
  ...Walk<Game, Friendly, From, 5>,
  ...Walk<Game, Friendly, From, 7>,
], From>
