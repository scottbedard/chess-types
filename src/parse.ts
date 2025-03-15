/** parse fen into game type */
export type Parse<T extends string> = T extends `${infer Board} ${infer CurrentTurn} ${infer CastlingRights} ${infer EnPassant} ${infer Halfmove} ${infer Fullmove}`
  ? {
    board: Board
    enPassant: EnPassant
    halfmove: Halfmove
    fullmove: Fullmove
    castlingRights: CastlingRights
    currentTurn: CurrentTurn
  }
  : never