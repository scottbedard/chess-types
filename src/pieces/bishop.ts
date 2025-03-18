import type {
  _Walk,
  Color,
  Index,
  ParsedGame,
} from '@/base'

import type { ToMoves } from '@/utils'

export type BishopMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ..._Walk<Game, Friendly, From, 0>,
  ..._Walk<Game, Friendly, From, 2>,
  ..._Walk<Game, Friendly, From, 6>,
  ..._Walk<Game, Friendly, From, 8>,
], From>
