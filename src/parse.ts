import type { Board } from './utils/game'

/** parse fen into game type */
export type Parse<T extends string> = T extends `${infer CurrentPosition} ${infer CurrentTurn} ${infer CastlingRights} ${infer EnPassant} ${infer Halfmove} ${infer Fullmove}`
  ? {
    board: Board<CurrentPosition>
    enPassant: EnPassant
    halfmove: Halfmove
    fullmove: Fullmove
    castlingRights: CastlingRights
    currentTurn: CurrentTurn
  }
  : never
