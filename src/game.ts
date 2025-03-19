/* eslint-disable @stylistic/no-multi-spaces */
import {
  Color,
  FriendlyPiece,
  Index,
  Indices,
  Move,
  ParsedGame,
  Piece,
  PieceColor,
  Positions,
} from './base'

import type { BishopMoves } from './pieces/bishop'
import type { IsOdd } from './utils'
import type { KingMoves } from './pieces/king'
import type { KnightMoves } from './pieces/knight'
import type { PawnMoves } from './pieces/pawn'
import type { QueenMoves } from './pieces/queen'
import type { RookMoves } from './pieces/rook'
import type { ToPositions, ToSans } from './notation'

/** Get all positions occupied by a color */
export type OccupiedBy<
  C extends Color,
  Game extends ParsedGame,
  Remaining extends Index[] = Indices,
  Acc extends Index[] = []
> = ToPositions<_OccupiedBy<C, Game, Remaining, Acc>>

export type _OccupiedBy<
  C extends Color,
  Game extends ParsedGame,
  Remaining extends Index[] = Indices,
  Acc extends Index[] = []
> = Remaining extends [infer Head extends Index, ...infer Tail extends Index[]]
  ? Game['board'][Head] extends FriendlyPiece<C>
    ? _OccupiedBy<C, Game, Tail, [...Acc, Head]>
    : _OccupiedBy<C, Game, Tail, Acc>
  : Acc

/** Get all possible moves, even ones that result in self-check */
export type CurrentMovesUnsafe<
  Game extends ParsedGame,
  Turn extends Color = Game['turn'],
  Moves extends Index[] = _OccupiedBy<Turn, Game>,
  Acc extends Move[] = []
> = _CurrentMovesUnsafe<Game, Turn, Moves, Acc> extends infer M extends Move[]
  ? ToSans<M>
  : never

export type _CurrentMovesUnsafe<
  Game extends ParsedGame,
  Turn extends Color = Game['turn'],
  Moves extends Index[] = _OccupiedBy<Turn, Game>,
  Acc extends Move[] = []
> = Moves extends [infer Head extends Index, ...infer Tail extends Index[]]
  ? Game['board'][Head] extends infer CurrentPiece extends Piece
    ? CurrentPiece extends 'p' | 'P' ? _CurrentMovesUnsafe<Game, Turn, Tail, [...Acc, ...PawnMoves<Game, PieceColor<CurrentPiece>, Head>]>
      : CurrentPiece extends 'n' | 'N' ? _CurrentMovesUnsafe<Game, Turn, Tail, [...Acc, ...KnightMoves<Game, PieceColor<CurrentPiece>, Head>]>
      : CurrentPiece extends 'b' | 'B' ? _CurrentMovesUnsafe<Game, Turn, Tail, [...Acc, ...BishopMoves<Game, PieceColor<CurrentPiece>, Head>]>
      : CurrentPiece extends 'r' | 'R' ? _CurrentMovesUnsafe<Game, Turn, Tail, [...Acc, ...RookMoves<Game, PieceColor<CurrentPiece>, Head>]>
      : CurrentPiece extends 'q' | 'Q' ? _CurrentMovesUnsafe<Game, Turn, Tail, [...Acc, ...QueenMoves<Game, PieceColor<CurrentPiece>, Head>]>
      : CurrentPiece extends 'k' | 'K' ? _CurrentMovesUnsafe<Game, Turn, Tail, [...Acc, ...KingMoves<Game, PieceColor<CurrentPiece>, Head>]>
      : never
    : never
  : Acc

/** create a debuggable representation of the chessboard */
export type Chessboard<T extends ParsedGame> = {
  8: [` ${_W<T,  0>} ${_W<T,  1>} ${_W<T,  2>} ${_W<T,  3>} ${_W<T,  4>} ${_W<T,  5>} ${_W<T,  6>} ${_W<T,  7>} `],
  7: [` ${_B<T,  8>} ${_B<T,  9>} ${_B<T, 10>} ${_B<T, 11>} ${_B<T, 12>} ${_B<T, 13>} ${_B<T, 14>} ${_B<T, 15>} `],
  6: [` ${_W<T, 16>} ${_W<T, 17>} ${_W<T, 18>} ${_W<T, 19>} ${_W<T, 20>} ${_W<T, 21>} ${_W<T, 22>} ${_W<T, 23>} `],
  5: [` ${_B<T, 24>} ${_B<T, 25>} ${_B<T, 26>} ${_B<T, 27>} ${_B<T, 28>} ${_B<T, 29>} ${_B<T, 30>} ${_B<T, 31>} `],
  4: [` ${_W<T, 32>} ${_W<T, 33>} ${_W<T, 34>} ${_W<T, 35>} ${_W<T, 36>} ${_W<T, 37>} ${_W<T, 38>} ${_W<T, 39>} `],
  3: [` ${_B<T, 40>} ${_B<T, 41>} ${_B<T, 42>} ${_B<T, 43>} ${_B<T, 44>} ${_B<T, 45>} ${_B<T, 46>} ${_B<T, 47>} `],
  2: [` ${_W<T, 48>} ${_W<T, 49>} ${_W<T, 50>} ${_W<T, 51>} ${_W<T, 52>} ${_W<T, 53>} ${_W<T, 54>} ${_W<T, 55>} `],
  1: [` ${_B<T, 56>} ${_B<T, 57>} ${_B<T, 58>} ${_B<T, 59>} ${_B<T, 60>} ${_B<T, 61>} ${_B<T, 62>} ${_B<T, 63>} `],
}

type _B<Game extends ParsedGame,I extends Index> =
  Game['board'][I] extends infer U extends Piece ? U : IsOdd<I> extends true ? '*' : '-'

type _W<Game extends ParsedGame, I extends Index> =
  Game['board'][I] extends infer U extends Piece ? U : IsOdd<I> extends true ? '-' : '*'

/** Find king by color */
export type FindKing<
  Game extends ParsedGame,
  C extends Color,
  King extends Piece = C extends 'w' ? 'K' : 'k',
  Remaining extends Index[] = Indices
> = _FindKing<Game, C, King, Remaining> extends infer K extends Index
  ? Positions[K]
  : false

export type _FindKing<
  Game extends ParsedGame,
  C extends Color,
  King extends Piece = C extends 'w' ? 'K' : 'k',
  Remaining extends Index[] = Indices
> = Remaining extends [infer Head extends Index, ...infer Tail extends Index[]]
  ? Game['board'][Head] extends King
    ? Head
    : _FindKing<Game, C, King, Tail>
  : false
