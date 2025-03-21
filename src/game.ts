/* eslint-disable @stylistic/no-multi-spaces */
import type {
  Color,
  EnemyColor,
  FriendlyPiece,
  Index,
  Indices,
  Move,
  ParsedGame,
  Piece,
  PieceColor,
  Position,
  PositionIndex,
  Positions,
} from './base'

import type { BishopMoves } from './pieces/bishop'
import type { KingMoves } from './pieces/king'
import type { KnightMoves } from './pieces/knight'
import type { PawnMoves } from './pieces/pawn'
import type { QueenMoves } from './pieces/queen'
import type { RookMoves } from './pieces/rook'
import type { ToPositions, ToSans } from './notation'

/** Get all positions occupied by a color */
export type OccupiedBy<
  Game extends ParsedGame,
  C extends Color,
  Remaining extends Index[] = Indices,
  Acc extends Index[] = []
> = ToPositions<_OccupiedBy<Game, C, Remaining, Acc>>

export type _OccupiedBy<
  Game extends ParsedGame,
  C extends Color,
  Remaining extends Index[] = Indices,
  Acc extends Index[] = []
> = Remaining extends [infer Head extends Index, ...infer Tail extends Index[]]
  ? Game['board'][Head] extends FriendlyPiece<C>
    ? _OccupiedBy<Game, C, Tail, [...Acc, Head]>
    : _OccupiedBy<Game, C, Tail, Acc>
  : Acc

/** Get all possible moves, even ones that result in self-check */
export type CurrentMovesUnsafe<
  Game extends ParsedGame,
  Turn extends Color = Game['turn'],
  From extends Index[] = _OccupiedBy<Game, Turn>,
  Acc extends Move[] = []
> = _CurrentMovesUnsafe<Game, Turn, From, Acc> extends infer M extends Move[]
  ? ToSans<M>
  : never

export type _CurrentMovesUnsafe<
  Game extends ParsedGame,
  Turn extends Color = Game['turn'],
  Moves extends Index[] = _OccupiedBy<Game, Turn>,
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
  8: ` ${_Square<T,  0, _White>} ${_Square<T,  1, _Black>} ${_Square<T,  2, _White>} ${_Square<T,  3, _Black>} ${_Square<T,  4, _White>} ${_Square<T,  5, _Black>} ${_Square<T,  6, _White>} ${_Square<T,  7, _Black>} `,
  7: ` ${_Square<T,  8, _Black>} ${_Square<T,  9, _White>} ${_Square<T, 10, _Black>} ${_Square<T, 11, _White>} ${_Square<T, 12, _Black>} ${_Square<T, 13, _White>} ${_Square<T, 14, _Black>} ${_Square<T, 15, _White>} `,
  6: ` ${_Square<T, 16, _White>} ${_Square<T, 17, _Black>} ${_Square<T, 18, _White>} ${_Square<T, 19, _Black>} ${_Square<T, 20, _White>} ${_Square<T, 21, _Black>} ${_Square<T, 22, _White>} ${_Square<T, 23, _Black>} `,
  5: ` ${_Square<T, 24, _Black>} ${_Square<T, 25, _White>} ${_Square<T, 26, _Black>} ${_Square<T, 27, _White>} ${_Square<T, 28, _Black>} ${_Square<T, 29, _White>} ${_Square<T, 30, _Black>} ${_Square<T, 31, _White>} `,
  4: ` ${_Square<T, 32, _White>} ${_Square<T, 33, _Black>} ${_Square<T, 34, _White>} ${_Square<T, 35, _Black>} ${_Square<T, 36, _White>} ${_Square<T, 37, _Black>} ${_Square<T, 38, _White>} ${_Square<T, 39, _Black>} `,
  3: ` ${_Square<T, 40, _Black>} ${_Square<T, 41, _White>} ${_Square<T, 42, _Black>} ${_Square<T, 43, _White>} ${_Square<T, 44, _Black>} ${_Square<T, 45, _White>} ${_Square<T, 46, _Black>} ${_Square<T, 47, _White>} `,
  2: ` ${_Square<T, 48, _White>} ${_Square<T, 49, _Black>} ${_Square<T, 50, _White>} ${_Square<T, 51, _Black>} ${_Square<T, 52, _White>} ${_Square<T, 53, _Black>} ${_Square<T, 54, _White>} ${_Square<T, 55, _Black>} `,
  1: ` ${_Square<T, 56, _Black>} ${_Square<T, 57, _White>} ${_Square<T, 58, _Black>} ${_Square<T, 59, _White>} ${_Square<T, 60, _Black>} ${_Square<T, 61, _White>} ${_Square<T, 62, _Black>} ${_Square<T, 63, _White>} `,
}

type _Black = '*'

type _White = '-'

type _Square<
  Game extends ParsedGame,
  I extends Index,
  Char extends _Black | _White
> = Game['board'][I] extends infer P extends Piece ? P : Char

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

/** Test if a king is threatened */
export type IsCheck<
  Game extends ParsedGame,
  KingColor extends Color = Game['turn'],
> = _FindKing<Game, KingColor> extends infer KingIndex extends Index
  ? _IsThreatened<Game, KingIndex, EnemyColor<KingColor>>
  : false

/** Test if position is threatened by a hostile color */
export type IsThreatened<
  Game extends ParsedGame,
  Target extends Position,
  HostileColor extends Color = EnemyColor<Game['turn']>,
  Acc extends Index[] = _OccupiedBy<Game, HostileColor>
> = _IsThreatened<Game, PositionIndex[Target], HostileColor, Acc>

export type _IsThreatened<
  Game extends ParsedGame,
  TargetIndex extends Index,
  HostileColor extends Color = EnemyColor<Game['turn']>,
  Acc extends Index[] = _OccupiedBy<Game, HostileColor>
> = Acc extends [infer PositionHead extends Index, ...infer PositionTail extends Index[]]
  ? Game['board'][PositionHead] extends FriendlyPiece<HostileColor>
    ? _CurrentMovesUnsafe<Game, HostileColor, [PositionHead]> extends infer PositionMoves extends Move[]
      ? _IsReachable<TargetIndex, PositionMoves> extends true
        ? true
        : _IsThreatened<Game, TargetIndex, HostileColor, PositionTail>
      : false
    : unknown
  : false

type _IsReachable<
  Target extends Index,
  Moves extends Move[]
> = Moves extends [infer Head extends Move, ...infer Tail extends Move[]]
  ? Head['to'] extends Target
    ? true
    : _IsReachable<Target, Tail>
  : false
