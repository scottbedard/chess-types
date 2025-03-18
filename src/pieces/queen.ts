import type { Color, ParsedGame } from '@/chess'
import type { _Walk, Index } from '@/board'
import type { ToMoves } from './shared'

export type QueenMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ..._Walk<Game, Friendly, From, 0>,
  ..._Walk<Game, Friendly, From, 1>,
  ..._Walk<Game, Friendly, From, 2>,
  ..._Walk<Game, Friendly, From, 3>,
  ..._Walk<Game, Friendly, From, 5>,
  ..._Walk<Game, Friendly, From, 6>,
  ..._Walk<Game, Friendly, From, 7>,
  ..._Walk<Game, Friendly, From, 8>,
], From>
