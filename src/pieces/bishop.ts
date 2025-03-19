import type {
  Color,
  Index,
  ParsedGame,
} from '../base'

import type { Walk } from '../board'
import type { ToMoves } from '../utils'

export type BishopMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ...Walk<Game, Friendly, From, 0>,
  ...Walk<Game, Friendly, From, 2>,
  ...Walk<Game, Friendly, From, 6>,
  ...Walk<Game, Friendly, From, 8>,
], From>
