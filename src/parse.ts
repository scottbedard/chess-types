import type { ParseBoard, ParseCastlingRights } from './utils/game'

/** parse fen into game type */
export type Parse<T extends string> = T extends `${infer CurrentPosition} ${infer CurrentTurn} ${infer CastlingRights} ${infer EnPassant} ${infer Halfmove} ${infer Fullmove}`
  ? {
    board: ParseBoard<CurrentPosition>
    enPassant: EnPassant
    halfmove: Halfmove extends `${infer U extends number}` ? U : never
    fullmove: Fullmove extends `${infer U extends number}` ? U : never
    castlingRights: ParseCastlingRights<CastlingRights>
    currentTurn: CurrentTurn
  }
  : never
