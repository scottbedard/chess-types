import type {
  Color,
  DirectionIndex,
  FriendlyPiece,
  Graph,
  Index,
  ParsedGame,
  PositionIndex,
  Positions,
  Unoccupied,
} from '@/base'

import type { ToPositions } from '@/utils'

/** Walk along the board, stopping short of friendly pieces */
export type Walk<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends Exclude<DirectionIndex, 4>, // <- cannot walk to center index
  Acc extends Index[] = [],
  To = Graph[From][Direction]
> = To extends Index
  ? Game['board'][To] extends Unoccupied
    ? Walk<Game, Friendly, To, Direction, [...Acc, To]>
    : Game['board'][To] extends FriendlyPiece<Friendly>
      ? Acc
      : [...Acc, To]
  : Acc

export type WalkPositions<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Positions[Index],
  Direction extends Exclude<DirectionIndex, 4>,
  Path = Walk<Game, Friendly, PositionIndex[From], Direction>
> = Path extends Index[]
  ? ToPositions<Path>
  : never
