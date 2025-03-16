/** Black pieces */
export type BlackPiece = 'r' | 'n' | 'b' | 'q' | 'k' | 'p'

/** White pieces */
export type WhitePiece = 'R' | 'N' | 'B' | 'Q' | 'K' | 'P'

/** Castling rights by color */
export type CastlingRights = {
  blackKing: boolean
  blackQueen: boolean
  whiteKing: boolean
  whiteQueen: boolean
}

/** Black or white */
export type Color = 'b' | 'w'

/** Parsed game state */
export type ParsedGame = {
  board: string
  turnColor: Color
  castlingRights: CastlingRights
  enPassant: string
  halfmove: number
  fullmove: number
}

/** All pieces */
export type Piece = BlackPiece | WhitePiece
