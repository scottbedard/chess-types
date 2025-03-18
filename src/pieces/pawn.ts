import type { Color, FriendlyPiece, ParsedGame } from '@/chess'
import type { Graph, Index, Position, _Walk } from '@/board'

export type PawnMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = [
  ..._PawnAdvance<Game, Friendly, From>,
  // ..._PawnCapturePortside<Game, Friendly, From>,
  // ..._PawnCaptureStarboard<Game, Friendly, From>,
  // ..._PawnCaptureEnPassantPortside<Game, Friendly, From>,
  // ..._PawnCaptureEnPassantStarboard<Game, Friendly, From>,
  // @todo: promotions
]

/** advance pawn forward, and if allowed advance again */
type _PawnAdvance<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends 1 | 7 = Friendly extends 'w' ? 1 : 7,
> = Graph[From][Direction] extends infer First extends Index
  ? Game['board'][First] extends '_'
    ? [
      First,
      ..._StartingPosition<Friendly, From> extends true
        ? Graph[First][Direction] extends infer Second extends Index
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

// // left
// type _PawnCapturePortside<
//   Game extends ParsedGame,
//   Friendly extends Color,
//   From extends Index,
// > = []

// // right
// type _PawnCaptureStarboard<
//   Game extends ParsedGame,
//   Friendly extends Color,
//   From extends Index,
// > = []

// // en passant left
// type _PawnCaptureEnPassantPortside<
//   Game extends ParsedGame,
//   Friendly extends Color,
//   From extends Index,
// > = []

// type _PawnCaptureEnPassantStarboard<
//   Game extends ParsedGame,
//   Friendly extends Color,
//   From extends Index,
// > = []
