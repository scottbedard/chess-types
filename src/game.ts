/* eslint-disable @stylistic/no-multi-spaces */
import type {
  Color,
  EnemyColor,
  FriendlyPiece,
  Graph,
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
    castling: _UpdateCastling<Game, Move>
    ep: _UpdateEnPassant<P, Move>
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
  P extends Piece,
  Move extends ParsedMove,
> = _IsWhiteCastleShort<Game, Move> extends true  ? _ReplaceValues<Game['board'], [
    [60, Unoccupied],
    [61, 'R'],
    [62, 'K'],
    [63, Unoccupied],
  ]>
  : _IsWhiteCastleLong<Game, Move> extends true ? _ReplaceValues<Game['board'], [
    [56, Unoccupied],
    [58, 'K'],
    [59, 'R'],
    [60, Unoccupied],
  ]>
  : _IsBlackCastleShort<Game, Move> extends true ? _ReplaceValues<Game['board'], [
    [4, Unoccupied],
    [5, 'r'],
    [6, 'k'],
    [7, Unoccupied],
  ]>
  : _IsBlackCastleLong<Game, Move> extends true ? _ReplaceValues<Game['board'], [
    [0, Unoccupied],
    [2, 'k'],
    [3, 'r'],
    [4, Unoccupied],
  ]>
  : Game['ep'] extends Move['to']
    ? P extends 'p'
      ? Graph[Move['to']][1] extends Index
        ? _ReplaceValues<Game['board'], [
          [Move['from'], Unoccupied],
          [Move['to'], P],
          [Graph[Move['to']][1], Unoccupied]
        ]>
        : never
      : P extends 'P'
        ? Graph[Move['to']][7] extends Index
          ? _ReplaceValues<Game['board'], [
            [Move['from'], Unoccupied],
            [Move['to'], P],
            [Graph[Move['to']][7], Unoccupied]
          ]>
          : never
        : _ReplaceValues<Game['board'], [
          [Move['from'], Unoccupied],
          [Move['to'], P],
        ]>
    : _ReplaceValues<Game['board'], [
      [Move['from'], Unoccupied],
      [Move['to'], P],
    ]>

type _UpdateCastling<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = {
  K: _IsWhiteCastleShort<Game, Move> extends true ? false : Game['castling']['K'],
  Q: _IsWhiteCastleLong<Game, Move> extends true ? false : Game['castling']['Q'],
  k: _IsBlackCastleShort<Game, Move> extends true ? false : Game['castling']['k'],
  q: _IsBlackCastleLong<Game, Move> extends true ? false : Game['castling']['q'],
}

type _UpdateEnPassant<
  P extends Piece,
  Move extends ParsedMove,
> =
  P extends 'p'
    ? Move['from'] extends 8 ? Move['to'] extends 24 ? 16 : null
    : Move['from'] extends 9 ? Move['to'] extends 25 ? 17 : null
    : Move['from'] extends 10 ? Move['to'] extends  26 ? 18 : null
    : Move['from'] extends 11 ? Move['to'] extends  27 ? 19 : null
    : Move['from'] extends 12 ? Move['to'] extends  28 ? 20 : null
    : Move['from'] extends 13 ? Move['to'] extends  29 ? 21 : null
    : Move['from'] extends 14 ? Move['to'] extends  30 ? 22 : null
    : Move['from'] extends 15 ? Move['to'] extends  31 ? 23 : null
    : null
  : P extends 'P'
    ? Move['from'] extends 48 ? Move['to'] extends 32 ? 40 : null
    : Move['from'] extends 49 ? Move['to'] extends 33 ? 41 : null
    : Move['from'] extends 50 ? Move['to'] extends 34 ? 42 : null
    : Move['from'] extends 51 ? Move['to'] extends 35 ? 43 : null
    : Move['from'] extends 52 ? Move['to'] extends 36 ? 44 : null
    : Move['from'] extends 53 ? Move['to'] extends 37 ? 45 : null
    : Move['from'] extends 54 ? Move['to'] extends 38 ? 46 : null
    : Move['from'] extends 55 ? Move['to'] extends 39 ? 47 : null
    : null
  : null

export type _ReplaceValues<
  T extends MaybePiece[],
  U extends [Index, MaybePiece][] = []
> = U extends [infer Head extends [Index, MaybePiece], ...infer Tail extends [Index, MaybePiece][]]
  ? _ReplaceValues<_ReplaceAt<T, Head[0], Head[1]>, Tail>
  : T

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
 * Get current legal moves
 */
export type CurrentMoves<
  Game extends ParsedGame,
  Turn extends Color = Game['turn'],
> = ToSans<_CurrentMoves<Game, Turn>>

type _CurrentMoves<
  Game extends ParsedGame,
  Turn extends Color = Game['turn'],
> = _CurrentMovesUnsafe<Game, Turn> extends infer UnsafeMoves extends ParsedMove[]
  ? _FilterIllegalMoves<Game, Turn, UnsafeMoves>
  : []

type _FilterIllegalMoves<
  Game extends ParsedGame,
  Turn extends Color,
  Moves extends ParsedMove[],
  Acc extends ParsedMove[] = []
> = Moves extends [infer Head extends ParsedMove, ...infer Tail extends ParsedMove[]]
  ? _IsLegal<Game, Head> extends true
    ? _FilterIllegalMoves<Game, Turn, Tail, [...Acc, Head]>
    : _FilterIllegalMoves<Game, Turn, Tail, Acc>
  : Acc

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
  From extends Index[] = _OccupiedBy<Game, Turn>,
  Acc extends Move[] = []
> = From extends [infer Head extends Index, ...infer Tail extends Index[]]
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
      1: ` ${_Square<T, 63, _W>} ${_Square<T, 62, _B>} ${_Square<T, 61, _W>} ${_Square<T, 60, _B>} ${_Square<T, 59, _W>} ${_Square<T, 58, _B>} ${_Square<T, 57, _W>} ${_Square<T, 56, _B>} `,
      2: ` ${_Square<T, 55, _B>} ${_Square<T, 54, _W>} ${_Square<T, 53, _B>} ${_Square<T, 52, _W>} ${_Square<T, 51, _B>} ${_Square<T, 50, _W>} ${_Square<T, 49, _B>} ${_Square<T, 48, _W>} `,
      3: ` ${_Square<T, 47, _W>} ${_Square<T, 46, _B>} ${_Square<T, 45, _W>} ${_Square<T, 44, _B>} ${_Square<T, 43, _W>} ${_Square<T, 42, _B>} ${_Square<T, 41, _W>} ${_Square<T, 40, _B>} `,
      4: ` ${_Square<T, 39, _B>} ${_Square<T, 38, _W>} ${_Square<T, 37, _B>} ${_Square<T, 36, _W>} ${_Square<T, 35, _B>} ${_Square<T, 34, _W>} ${_Square<T, 33, _B>} ${_Square<T, 32, _W>} `,
      5: ` ${_Square<T, 31, _W>} ${_Square<T, 30, _B>} ${_Square<T, 29, _W>} ${_Square<T, 28, _B>} ${_Square<T, 27, _W>} ${_Square<T, 26, _B>} ${_Square<T, 25, _W>} ${_Square<T, 24, _B>} `,
      6: ` ${_Square<T, 23, _B>} ${_Square<T, 22, _W>} ${_Square<T, 21, _B>} ${_Square<T, 20, _W>} ${_Square<T, 19, _B>} ${_Square<T, 18, _W>} ${_Square<T, 17, _B>} ${_Square<T, 16, _W>} `,
      7: ` ${_Square<T, 15, _W>} ${_Square<T, 14, _B>} ${_Square<T, 13, _W>} ${_Square<T, 12, _B>} ${_Square<T, 11, _W>} ${_Square<T, 10, _B>} ${_Square<T,  9, _W>} ${_Square<T,  8, _B>} `,
      8: ` ${_Square<T,  7, _B>} ${_Square<T,  6, _W>} ${_Square<T,  5, _B>} ${_Square<T,  4, _W>} ${_Square<T,  3, _B>} ${_Square<T,  2, _W>} ${_Square<T,  1, _B>} ${_Square<T,  0, _W>} `,
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
> = Game['board'][Move['from']] extends infer P extends Piece
  ? _IsBlackCastleShort<Game, Move> extends true ? 1
  : _IsBlackCastleLong<Game, Move> extends true ? 2
  : _IsWhiteCastleShort<Game, Move> extends true ? 3
  : _IsWhiteCastleLong<Game, Move> extends true ? 4
  : PieceColor<P> extends infer C extends Color
    ? _CurrentMovesUnsafe<Game, C, [Move['from']]> extends infer UnsafeMoves extends ParsedMove[]
      ? _ContainsMove<Move, UnsafeMoves> extends true
        ? _ExposesKing<Game, Move> extends false
          ? true // move is legal
          : false // prohibit self-check
        : false // move is not among the unsafe moves
      : never // we're checking one position
    : never // pieces must have a color
  : false // no piece at from position

type _ContainsMove<
  T extends ParsedMove,
  Acc extends ParsedMove[],
> = Acc extends [infer Head extends ParsedMove, ...infer Tail extends ParsedMove[]]
    ? Head extends T
      ? true
      : _ContainsMove<T, Tail>
    : false

type _ExposesKing<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['board'][Move['from']] extends infer P extends Piece
  ? IsCheck<_ApplyMoveUnsafe<Game, Move>, PieceColor<P>>
  : false

type _IsBlackCastleShort<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['castling']['k'] extends true
  ? [Move['from'], Move['to']] extends [4, 6] ? true : false
  : false

type _IsBlackCastleLong<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['castling']['q'] extends true
  ? [Move['from'], Move['to']] extends [4, 2] ? true : false
  : false

type _IsWhiteCastleShort<
  Game extends ParsedGame,
  Move extends ParsedMove,
> = Game['castling']['K'] extends true
  ? [Move['from'], Move['to']] extends [60, 62] ? true : false
  : false

type _IsWhiteCastleLong<
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

/**
 * Play a game
 */
export type Play<
Game extends ParsedGame,
Moves extends string[],
> = Moves extends [infer Head extends string, ...infer Tail extends string[]]
? Play<ApplyMoveUnsafe<Game, Head>, Tail>
: Game

type _Play<
  Game extends ParsedGame,
  Moves extends ParsedMove[],
> = Moves extends [infer Head extends ParsedMove, ...infer Tail extends ParsedMove[]]
  ? _Play<_ApplyMoveUnsafe<Game, Head>, Tail>
  : Game
