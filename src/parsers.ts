import type { Includes, Int } from './utils/string'
import type { Color, ParsedGame, Piece } from './chess'

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
      ep: _Ep
      halfmove: Int<Halfmove>
      fullmove: Int<Fullmove>
      castling: ParseCastling<_Castling>
      turn: _Turn extends Color ? _Turn : never
    }
  : never
