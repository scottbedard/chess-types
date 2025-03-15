import { assertType, test } from 'vitest'
import type { Expect, Equal } from '@/util/testing'
import type { Parse } from '@/index'

test('Parse', () => {
  type Expected = {
    board: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    enPassant: "-";
    halfmove: "0";
    fullmove: "1";
    castlingRights: "KQkq";
    currentTurn: "w";
  }

  type Actual = Parse<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>
  
  assertType<Expect<Equal<Expected, Actual>>>(true)
})
