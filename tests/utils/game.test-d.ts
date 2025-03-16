import { assertType, test } from 'vitest'
import type { Board } from '@/utils/game'

test('Board<T>', () => {
  type Result = Board<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'>

  assertType<Result>('rnbqkbnr_pppppppp_____________________________________PPPPPPPP_RNBQKBNR')
})
