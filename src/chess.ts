/** Black pieces */
export type BlackPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p'

/** White pieces */
export type WhitePiece = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P'

/** Castling rights by color */
export type Castling = {
  K: boolean
  Q: boolean
  k: boolean
  q: boolean
}

/** Black or white */
export type Color = 'b' | 'w'

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
  ep: string
  halfmove: number
  fullmove: number
}

/** All pieces */
export type Piece = BlackPiece | WhitePiece

/** Possible value at a position */
export type MaybePiece = Piece | '_'
