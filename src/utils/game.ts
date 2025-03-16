import type { Includes } from './string'

/** Black pieces */
export type BlackPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p'

/** White pieces */
export type WhitePiece = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P'

export type CastlingRights = {
  blackKing: boolean
  blackQueen: boolean
  whiteKing: boolean
  whiteQueen: boolean
}

/** Black or white */
export type Color = 'b' | 'w'

/** All pieces */
export type Piece = BlackPiece | WhitePiece

/** Normalize fen board string to a 64 character string */
export type ParseBoard<
  T extends string,
  Acc extends string = ''
> = T extends `${infer Head}${infer Rest}`
  ? Head extends '/' ? ParseBoard<Rest, `${Acc}_`> :
    Head extends '1' ? ParseBoard<Rest, `${Acc}${'_'}`> :
    Head extends '2' ? ParseBoard<Rest, `${Acc}${'__'}`> :
    Head extends '3' ? ParseBoard<Rest, `${Acc}${'___'}`> :
    Head extends '4' ? ParseBoard<Rest, `${Acc}${'____'}`> :
    Head extends '5' ? ParseBoard<Rest, `${Acc}${'_____'}`> :
    Head extends '6' ? ParseBoard<Rest, `${Acc}${'______'}`> :
    Head extends '7' ? ParseBoard<Rest, `${Acc}${'_______'}`> :
    Head extends '8' ? ParseBoard<Rest, `${Acc}${'________'}`> :
    Head extends Piece ? ParseBoard<Rest, `${Acc}${Head}`>
  : never
: Acc

/** Parse castling rights */
export type ParseCastlingRights<T extends string> = {
  blackKing: Includes<T, 'k'>
  blackQueen: Includes<T, 'q'>
  whiteKing: Includes<T, 'K'>
  whiteQueen: Includes<T, 'Q'>
}
