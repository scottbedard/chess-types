import { Index } from './board'

/** File */
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'

/** Rank */
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

/** Black or white */
export type Color = 'b' | 'w'

/** Black pieces */
export type BlackPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p'

/** White pieces */
export type WhitePiece = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P'

/** All pieces */
export type Piece = BlackPiece | WhitePiece

/** Promotion pieces */
export type PromotionPiece = Exclude<Piece, 'p' | 'P' | 'k' | 'K'>

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
