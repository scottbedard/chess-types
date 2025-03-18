import { PositionIndex } from './board'
import type { Color, File, ParsedGame, Piece, PromotionPiece, Rank } from './chess'
import type { Includes, Int } from './utils/string'

/** Normalize fen board string to a 64 character string */
export type ParseBoard<
  T extends string,
  Acc extends (string | '_')[] = []
> = T extends `${infer Head}${infer Rest}`
  ? Head extends '/' ? ParseBoard<Rest, [...Acc]> :
    Head extends '1' ? ParseBoard<Rest, [...Acc, '_']> :
    Head extends '2' ? ParseBoard<Rest, [...Acc, '_', '_']> :
    Head extends '3' ? ParseBoard<Rest, [...Acc, '_', '_', '_']> :
    Head extends '4' ? ParseBoard<Rest, [...Acc, '_', '_', '_', '_']> :
    Head extends '5' ? ParseBoard<Rest, [...Acc, '_', '_', '_', '_', '_']> :
    Head extends '6' ? ParseBoard<Rest, [...Acc, '_', '_', '_', '_', '_', '_']> :
    Head extends '7' ? ParseBoard<Rest, [...Acc, '_', '_', '_', '_', '_', '_', '_']> :
    Head extends '8' ? ParseBoard<Rest, [...Acc, '_', '_', '_', '_', '_', '_', '_', '_']> :
    Head extends Piece ? ParseBoard<Rest, [...Acc, Head]> : never
  : Acc['length'] extends 64 ? Acc : never

/** Parse castling rights */
export type ParseCastling<T extends string> = {
  K: Includes<T, 'K'>
  Q: Includes<T, 'Q'>
  k: Includes<T, 'k'>
  q: Includes<T, 'q'>
}

/** Parse fen string */
export type ParseFen<T extends string, U =
  _ParseFen<T>> = U extends ParsedGame
    ? U['board'] extends never ? never
    : U['castling'] extends never ? never
    : U['ep'] extends never ? never
    : U['halfmove'] extends never ? never
    : U['fullmove'] extends never ? never
    : U['turn'] extends never ? never
    : U
  : never

export type _ParseFen<T extends string> =
  T extends `${infer _Board} ${infer _Turn} ${infer _Castling} ${infer _Ep} ${infer Halfmove} ${infer Fullmove}`
    ? {
      board: ParseBoard<_Board>
      ep: _Ep extends
        | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3'
        | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6'
        ? PositionIndex[_Ep]
        : _Ep extends '-'
          ? null
          : never
      halfmove: Int<Halfmove>
      fullmove: Int<Fullmove>
      castling: ParseCastling<_Castling>
      turn: _Turn extends Color ? _Turn : never
    }
  : never

/** Parse move notation */
export type ParseSan<T extends string> =
  T extends `${infer FromFile extends File}${infer FromRank extends Rank}${infer ToFile extends File}${infer ToRank extends Rank}${infer Promotion extends PromotionPiece | ''}`
    ? {
      from: PositionIndex[`${FromFile}${FromRank}`],
      to: PositionIndex[`${ToFile}${ToRank}`],
      promotion: Promotion extends PromotionPiece ? Promotion : null
    }
    : never
