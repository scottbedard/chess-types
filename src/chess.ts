import { Index } from './board'

/** Black or white */
export type Color = 'b' | 'w'

/** Black pieces */
export type BlackPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p'

/** White pieces */
export type WhitePiece = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P'

/** All pieces */
export type Piece = BlackPiece | WhitePiece

/** Possible value at a position */
export type MaybePiece = Piece | '_'

/** Friendly pieces */
export type FriendlyPiece<T extends Color> = T extends 'b' ? BlackPiece : WhitePiece

/** Castling rights by color */
export type Castling = {
  K: boolean
  Q: boolean
  k: boolean
  q: boolean
}

/** Parsed game state */
export type ParsedGame = {
  board: [
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
    MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece, MaybePiece,
  ]
  turn: Color
  castling: Castling
  ep: Index | null
  halfmove: number
  fullmove: number
}
