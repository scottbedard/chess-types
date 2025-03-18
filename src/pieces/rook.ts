import type { Color, ParsedGame } from '@/chess'
import type { _Walk, Index } from '@/board'
import type { ToMoves } from './shared'

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
