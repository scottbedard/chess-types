import type { Color, ParsedGame } from '@/chess'
import type { ToMoves } from './shared'
import type { _Walk, Index } from '@/board'

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
