/* eslint-disable @stylistic/no-multi-spaces */
import type {
  Color,
  EnemyColor,
  FriendlyPiece,
  Index,
  Indices,
  MaybePiece,
  Move,
  ParsedGame,
  ParsedMove,
  Piece,
  PieceColor,
  Position,
  PositionIndex,
  Positions,
  Unoccupied,
} from './base'

import type {
  ParseSan,
  ToPositions,
  ToSans,
} from './notation'

import type { Increment } from './utils'

import type { BishopMoves } from './pieces/bishop'
import type { KingMoves } from './pieces/king'
import type { KnightMoves } from './pieces/knight'
import type { PawnMoves } from './pieces/pawn'
import type { QueenMoves } from './pieces/queen'
import type { RookMoves } from './pieces/rook'

/**
 * Apply move to a game, regardless of turn or legality
 */
export type ApplyMoveUnsafe<
  Game extends ParsedGame,
  San extends string
> = _ApplyMoveUnsafe<Game, ParseSan<San>>

type _ApplyMoveUnsafe<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['board'][Move['from']] extends infer P extends Piece
  ? {
    board: _UpdateBoard<Game, P, Move>
    turn: EnemyColor<PieceColor<P>>
    halfmove: _CountHalfmove<Game, P, Move>
    fullmove: _CountFullmove<Game, P>
    castling: Game['castling']
    ep: Game['ep']
  }
  : never

type _CountHalfmove<
  Game extends ParsedGame,
  P extends Piece,
  Move extends ParsedMove,
> = P extends 'p' | 'P'
  ? 0
  : Game['board'][Move['to']] extends Piece
      ? 0
      : Increment<Game['halfmove']>

type _CountFullmove<
  Game extends ParsedGame,
  P extends MaybePiece,
> = P extends Piece
  ? PieceColor<P> extends 'b'
    ? Increment<Game['fullmove']>
    : Game['fullmove']
  : Game['fullmove']

type _UpdateBoard<
  Game extends ParsedGame,
  MovingPiece extends Piece,
  Move extends ParsedMove,
> = _ReplaceAt<
  _ReplaceAt<Game['board'], Move['from'], Unoccupied>,
  Move['to'],
  MovingPiece
>

export type _ReplaceAt<
  T extends MaybePiece[],
  U extends Index,
  V extends MaybePiece
> = [
  U extends 0 ? V : T[0], U extends 1 ? V : T[1], U extends 2 ? V : T[2], U extends 3 ? V : T[3], U extends 4 ? V : T[4], U extends 5 ? V : T[5], U extends 6 ? V : T[6], U extends 7 ? V : T[7],
  U extends 8 ? V : T[8], U extends 9 ? V : T[9], U extends 10 ? V : T[10], U extends 11 ? V : T[11], U extends 12 ? V : T[12], U extends 13 ? V : T[13], U extends 14 ? V : T[14], U extends 15 ? V : T[15],
  U extends 16 ? V : T[16], U extends 17 ? V : T[17], U extends 18 ? V : T[18], U extends 19 ? V : T[19], U extends 20 ? V : T[20], U extends 21 ? V : T[21], U extends 22 ? V : T[22], U extends 23 ? V : T[23],
  U extends 24 ? V : T[24], U extends 25 ? V : T[25], U extends 26 ? V : T[26], U extends 27 ? V : T[27], U extends 28 ? V : T[28], U extends 29 ? V : T[29], U extends 30 ? V : T[30], U extends 31 ? V : T[31],
  U extends 32 ? V : T[32], U extends 33 ? V : T[33], U extends 34 ? V : T[34], U extends 35 ? V : T[35], U extends 36 ? V : T[36], U extends 37 ? V : T[37], U extends 38 ? V : T[38], U extends 39 ? V : T[39],
  U extends 40 ? V : T[40], U extends 41 ? V : T[41], U extends 42 ? V : T[42], U extends 43 ? V : T[43], U extends 44 ? V : T[44], U extends 45 ? V : T[45], U extends 46 ? V : T[46], U extends 47 ? V : T[47],
  U extends 48 ? V : T[48], U extends 49 ? V : T[49], U extends 50 ? V : T[50], U extends 51 ? V : T[51], U extends 52 ? V : T[52], U extends 53 ? V : T[53], U extends 54 ? V : T[54], U extends 55 ? V : T[55],
  U extends 56 ? V : T[56], U extends 57 ? V : T[57], U extends 58 ? V : T[58], U extends 59 ? V : T[59], U extends 60 ? V : T[60], U extends 61 ? V : T[61], U extends 62 ? V : T[62], U extends 63 ? V : T[63],
]

/**
 * Get all possible moves, even ones that result in self-check
 **/
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

/**
 * Create a hover-display of the chessboard
 **/
export type Chessboard<
  T extends ParsedGame,
  Flipped extends boolean = false
> =
  Flipped extends true
    ? {
      8: ` ${_Square<T, 63, _W>} ${_Square<T, 62, _B>} ${_Square<T, 61, _W>} ${_Square<T, 60, _B>} ${_Square<T, 59, _W>} ${_Square<T, 58, _B>} ${_Square<T, 57, _W>} ${_Square<T, 56, _B>} `,
      7: ` ${_Square<T, 55, _B>} ${_Square<T, 54, _W>} ${_Square<T, 53, _B>} ${_Square<T, 52, _W>} ${_Square<T, 51, _B>} ${_Square<T, 50, _W>} ${_Square<T, 49, _B>} ${_Square<T, 48, _W>} `,
      6: ` ${_Square<T, 47, _W>} ${_Square<T, 46, _B>} ${_Square<T, 45, _W>} ${_Square<T, 44, _B>} ${_Square<T, 43, _W>} ${_Square<T, 42, _B>} ${_Square<T, 41, _W>} ${_Square<T, 40, _B>} `,
      5: ` ${_Square<T, 39, _B>} ${_Square<T, 38, _W>} ${_Square<T, 37, _B>} ${_Square<T, 36, _W>} ${_Square<T, 35, _B>} ${_Square<T, 34, _W>} ${_Square<T, 33, _B>} ${_Square<T, 32, _W>} `,
      4: ` ${_Square<T, 31, _W>} ${_Square<T, 30, _B>} ${_Square<T, 29, _W>} ${_Square<T, 28, _B>} ${_Square<T, 27, _W>} ${_Square<T, 26, _B>} ${_Square<T, 25, _W>} ${_Square<T, 24, _B>} `,
      3: ` ${_Square<T, 23, _B>} ${_Square<T, 22, _W>} ${_Square<T, 21, _B>} ${_Square<T, 20, _W>} ${_Square<T, 19, _B>} ${_Square<T, 18, _W>} ${_Square<T, 17, _B>} ${_Square<T, 16, _W>} `,
      2: ` ${_Square<T, 15, _W>} ${_Square<T, 14, _B>} ${_Square<T, 13, _W>} ${_Square<T, 12, _B>} ${_Square<T, 11, _W>} ${_Square<T, 10, _B>} ${_Square<T,  9, _W>} ${_Square<T,  8, _B>} `,
      1: ` ${_Square<T,  7, _B>} ${_Square<T,  6, _W>} ${_Square<T,  5, _B>} ${_Square<T,  4, _W>} ${_Square<T,  3, _B>} ${_Square<T,  2, _W>} ${_Square<T,  1, _B>} ${_Square<T,  0, _W>} `,
    }
    : {
      8: ` ${_Square<T,  0, _W>} ${_Square<T,  1, _B>} ${_Square<T,  2, _W>} ${_Square<T,  3, _B>} ${_Square<T,  4, _W>} ${_Square<T,  5, _B>} ${_Square<T,  6, _W>} ${_Square<T,  7, _B>} `,
      7: ` ${_Square<T,  8, _B>} ${_Square<T,  9, _W>} ${_Square<T, 10, _B>} ${_Square<T, 11, _W>} ${_Square<T, 12, _B>} ${_Square<T, 13, _W>} ${_Square<T, 14, _B>} ${_Square<T, 15, _W>} `,
      6: ` ${_Square<T, 16, _W>} ${_Square<T, 17, _B>} ${_Square<T, 18, _W>} ${_Square<T, 19, _B>} ${_Square<T, 20, _W>} ${_Square<T, 21, _B>} ${_Square<T, 22, _W>} ${_Square<T, 23, _B>} `,
      5: ` ${_Square<T, 24, _B>} ${_Square<T, 25, _W>} ${_Square<T, 26, _B>} ${_Square<T, 27, _W>} ${_Square<T, 28, _B>} ${_Square<T, 29, _W>} ${_Square<T, 30, _B>} ${_Square<T, 31, _W>} `,
      4: ` ${_Square<T, 32, _W>} ${_Square<T, 33, _B>} ${_Square<T, 34, _W>} ${_Square<T, 35, _B>} ${_Square<T, 36, _W>} ${_Square<T, 37, _B>} ${_Square<T, 38, _W>} ${_Square<T, 39, _B>} `,
      3: ` ${_Square<T, 40, _B>} ${_Square<T, 41, _W>} ${_Square<T, 42, _B>} ${_Square<T, 43, _W>} ${_Square<T, 44, _B>} ${_Square<T, 45, _W>} ${_Square<T, 46, _B>} ${_Square<T, 47, _W>} `,
      2: ` ${_Square<T, 48, _W>} ${_Square<T, 49, _B>} ${_Square<T, 50, _W>} ${_Square<T, 51, _B>} ${_Square<T, 52, _W>} ${_Square<T, 53, _B>} ${_Square<T, 54, _W>} ${_Square<T, 55, _B>} `,
      1: ` ${_Square<T, 56, _B>} ${_Square<T, 57, _W>} ${_Square<T, 58, _B>} ${_Square<T, 59, _W>} ${_Square<T, 60, _B>} ${_Square<T, 61, _W>} ${_Square<T, 62, _B>} ${_Square<T, 63, _W>} `,
    }

type _B = '*'

type _W = '-'

type _Square<
  Game extends ParsedGame,
  I extends Index,
  Char extends _B | _W
> = Game['board'][I] extends infer P extends Piece ? P : Char

/**
 * Find king by color
 */
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

/**
 * Test if a king is threatened
 **/
export type IsCheck<
  Game extends ParsedGame,
  KingColor extends Color = Game['turn'],
> = _FindKing<Game, KingColor> extends infer KingIndex extends Index
  ? _IsThreatened<Game, KingIndex, EnemyColor<KingColor>>
  : false

/**
 * Test if a move is legal
 */
export type IsLegal<
  Game extends ParsedGame,
  San extends string,
> = _IsLegal<Game, ParseSan<San>>

type _IsLegal<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['board'][Move['from']] extends MaybePiece ? false
  : _IsBlackShortCastle<Game, Move> extends true ? 1
  : _IsBlackLongCastle<Game, Move> extends true ? 2
  : _IsWhiteShortCastle<Game, Move> extends true ? 3
  : _IsWhiteLongCastle<Game, Move> extends true ? 4
  : 5

type _IsBlackShortCastle<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['castling']['k'] extends true
  ? [Move['from'], Move['to']] extends [4, 6] ? true : false
  : false

type _IsBlackLongCastle<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['castling']['q'] extends true
  ? [Move['from'], Move['to']] extends [4, 2] ? true : false
  : false

type _IsWhiteShortCastle<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['castling']['K'] extends true
  ? [Move['from'], Move['to']] extends [60, 62] ? true : false
  : false

type _IsWhiteLongCastle<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['castling']['Q'] extends true
  ? [Move['from'], Move['to']] extends [60, 58] ? true : false
  : false

/**
 * Test if position is threatened by a hostile color
 **/
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

/**
 * Get all positions occupied by a color
 **/
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
