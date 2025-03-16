import { assertType, test } from 'vitest'
import type { Parse } from '@/index'

test('Parse', () => {
  type Result = Parse<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

  assertType<Result>({
    board: "rnbqkbnr_pppppppp_____________________________________PPPPPPPP_RNBQKBNR",
    enPassant: "-",
    halfmove: "0",
    fullmove: "1",
    castlingRights: "KQkq",
    currentTurn: "w",
  })
})
