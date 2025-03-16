import { assertType, test } from 'vitest'
import type { ParseBoard } from '@/utils/game'

test('ParseBoard<T>', () => {
  type Result = ParseBoard<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'>

  assertType<Result>('rnbqkbnr_pppppppp_____________________________________PPPPPPPP_RNBQKBNR')
})
