import type {
  _Walk,
  Color,
  FriendlyPiece,
  Graph,
  Index,
  ParsedGame,
} from '@/base'

import type { ToMoves } from '@/utils'

export type PawnMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Portside extends 0 | 8 = Friendly extends 'w' ? 0 : 8,
  Starboard extends 2 | 6 = Friendly extends 'w' ? 2 : 6
> = [
  ...ToMoves<[
    ..._PawnAdvance<Game, Friendly, From>,
    ..._PawnCapture<Game, Friendly, From, Portside>,
    ..._PawnCapture<Game, Friendly, From, Starboard>,
  ], From>,
  ..._PawnEnPassant<Game, Friendly, From, Portside>,
  ..._PawnEnPassant<Game, Friendly, From, Starboard>,
]

/** advance pawn forward, and if allowed advance again */
type _PawnAdvance<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Forward extends 1 | 7 = Friendly extends 'w' ? 1 : 7,
> = Graph[From][Forward] extends infer First extends Index
  ? Game['board'][First] extends '_'
    ? [
      First,
      ..._StartingPosition<Friendly, From> extends true
        ? Graph[First][Forward] extends infer Second extends Index
          ? Game['board'][Second] extends '_'
            ? [Second]
            : []
          : []
        : []
    ]
    : []
  : []

type _StartingPosition<
  Friendly extends Color,
  From extends Index,
> = Friendly extends 'w'
  ? From extends 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 ? true : false
  : From extends 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 ? true : false

/** capture enemy piece */
type _PawnCapture<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends 0 | 2 | 6 | 8,
> = Graph[From][Direction] extends infer To extends Index
    ? Game['board'][To] extends FriendlyPiece<Friendly> | '_'
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
    ? [{ to: To, from: From, promotion: null }]
    : []
  : []

/** promotions */
export type _PawnPromotion<T extends Index[]> = T // @todo
