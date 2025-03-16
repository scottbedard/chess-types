import type { Includes, Int, IsLength } from './utils/string'
import type { Color, ParsedGame, Piece } from './chess'

/** Normalize fen board string to a 64 character string */
export type ParseBoard<
  T extends string,
  Acc extends string = '',
> = T extends `${infer Head}${infer Rest}`
  ? Head extends '/' ? ParseBoard<Rest, Acc> :
    Head extends '1' ? ParseBoard<Rest, `${Acc}${'_'}`> :
    Head extends '2' ? ParseBoard<Rest, `${Acc}${'__'}`> :
    Head extends '3' ? ParseBoard<Rest, `${Acc}${'___'}`> :
    Head extends '4' ? ParseBoard<Rest, `${Acc}${'____'}`> :
    Head extends '5' ? ParseBoard<Rest, `${Acc}${'_____'}`> :
    Head extends '6' ? ParseBoard<Rest, `${Acc}${'______'}`> :
    Head extends '7' ? ParseBoard<Rest, `${Acc}${'_______'}`> :
    Head extends '8' ? ParseBoard<Rest, `${Acc}${'________'}`> :
    Head extends Piece ? ParseBoard<Rest, `${Acc}${Head}`> : never
  : IsLength<Acc, 64> extends true ? Acc : never

/** Parse castling rights */
export type ParseCastlingRights<T extends string> = {
  blackKing: Includes<T, 'k'>
  blackQueen: Includes<T, 'q'>
  whiteKing: Includes<T, 'K'>
  whiteQueen: Includes<T, 'Q'>
}

/** Parse fen string */
export type ParseFen<T extends string, U =
  _ParseFen<T>> = U extends ParsedGame
    ? U['board'] extends never ? never
    : U['castlingRights'] extends never ? never
    : U['enPassant'] extends never ? never
    : U['halfmove'] extends never ? never
    : U['fullmove'] extends never ? never
    : U['turnColor'] extends never ? never
    : U
  : never

export type _ParseFen<T extends string> =
  T extends `${infer CurrentPosition} ${infer CurrentTurn} ${infer CastlingRights} ${infer EnPassant} ${infer Halfmove} ${infer Fullmove}`
    ? {
      board: ParseBoard<CurrentPosition>
      enPassant: EnPassant
      halfmove: Int<Halfmove>
      fullmove: Int<Fullmove>
      castlingRights: ParseCastlingRights<CastlingRights>
      turnColor: CurrentTurn extends Color ? CurrentTurn : never
    }
  : never
