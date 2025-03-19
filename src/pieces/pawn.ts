/* eslint-disable @stylistic/no-multi-spaces */
import type {
  Color,
  FriendlyPiece,
  Graph,
  Index,
  ParsedGame,
  ParsedMove,
  Unoccupied,
} from '../base'

import { ToMoves } from '../utils'

export type PawnMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Portside extends 0 | 8 = Friendly extends 'w' ? 0 : 8,
  Starboard extends 2 | 6 = Friendly extends 'w' ? 2 : 6
> = _ExpandPromotions<
  ToMoves<[
    ..._PawnAdvance<Game, Friendly, From>,
    ..._PawnCapture<Game, Friendly, From, Portside>,
    ..._PawnCapture<Game, Friendly, From, Starboard>,
    ..._PawnEnPassant<Game, Friendly, From, Portside>,
    ..._PawnEnPassant<Game, Friendly, From, Starboard>,
  ], From>,
  Friendly
>

/** advance pawn forward, and if allowed advance again */
type _PawnAdvance<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Forward extends 1 | 7 = Friendly extends 'w' ? 1 : 7,
> = Graph[From][Forward] extends infer First extends Index
  ? Game['board'][First] extends Unoccupied
    ? [
      First,
      ...From extends _PawnStartingPositions
        ? Graph[First][Forward] extends infer Second extends Index
          ? Game['board'][Second] extends Unoccupied
            ? [Second]
            : []
          : []
        : []
    ]
    : []
  : []

type _PawnStartingPositions =
  |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15
  | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55

/** capture enemy piece */
type _PawnCapture<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends 0 | 2 | 6 | 8,
> = Graph[From][Direction] extends infer To extends Index
    ? Game['board'][To] extends FriendlyPiece<Friendly> | Unoccupied
      ? []
      : [To]
    : []

/** capture en passant */
type _PawnEnPassant<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends 0 | 2 | 6 | 8,
> = Graph[From][Direction] extends infer To extends Game['ep']
  ? Game['turn'] extends Friendly
    ? To extends Index
      ? [To]
      : []
    : []
  : []

/** promotions */
export type _ExpandPromotions<
  T extends ParsedMove[],
  U extends Color,
  Acc extends ParsedMove[] = []
> = T extends [infer Head extends ParsedMove, ...infer Tail extends ParsedMove[]]
  ? Head['to'] extends _PawnPromotionPositions
    ? _ExpandPromotions<Tail, U, [
      ...Acc,
      { to: Head['to'], from: Head['from'], promotion: U extends 'w' ? 'Q' : 'q' },
      { to: Head['to'], from: Head['from'], promotion: U extends 'w' ? 'R' : 'r' },
      { to: Head['to'], from: Head['from'], promotion: U extends 'w' ? 'N' : 'n' },
      { to: Head['to'], from: Head['from'], promotion: U extends 'w' ? 'B' : 'b' },
    ]>
    : _ExpandPromotions<Tail, U, [...Acc, Head]>
  : Acc

type _PawnPromotionPositions =
  |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7
  | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63
