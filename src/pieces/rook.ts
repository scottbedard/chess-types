import type {
  _Walk,
  Color,
  Index,
  ParsedGame,
} from '@/base'

import type { ToMoves } from '@/utils'

export type RookMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ..._Walk<Game, Friendly, From, 1>,
  ..._Walk<Game, Friendly, From, 3>,
  ..._Walk<Game, Friendly, From, 5>,
  ..._Walk<Game, Friendly, From, 7>,
], From>
