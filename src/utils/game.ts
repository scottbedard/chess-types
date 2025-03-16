/** Black pieces */
export type BlackPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p'

/** White pieces */
export type WhitePiece = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P'

/** Black or white */
export type Color = 'b' | 'w'

/** All pieces */
export type Piece = BlackPiece | WhitePiece

/** Normalize fen board string to a 64 character string */
export type Board<
  T extends string,
  Acc extends string = ''
> = T extends `${infer Head}${infer Rest}`
  ? Head extends '/' ? Board<Rest, `${Acc}_`> :
    Head extends '1' ? Board<Rest, `${Acc}${'_'}`> :
    Head extends '2' ? Board<Rest, `${Acc}${'__'}`> :
    Head extends '3' ? Board<Rest, `${Acc}${'___'}`> :
    Head extends '4' ? Board<Rest, `${Acc}${'____'}`> :
    Head extends '5' ? Board<Rest, `${Acc}${'_____'}`> :
    Head extends '6' ? Board<Rest, `${Acc}${'______'}`> :
    Head extends '7' ? Board<Rest, `${Acc}${'_______'}`> :
    Head extends '8' ? Board<Rest, `${Acc}${'________'}`> :
    Head extends Piece ? Board<Rest, `${Acc}${Head}`>
  : never
: Acc
