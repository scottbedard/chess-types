import { assertType, test } from 'vitest'
import type { Evaluate } from '@/evaluate'
import type { NewGame } from '@/game'

test('Evaluate', () => {
  type Result = Evaluate<NewGame>

  assertType<Result>(0)
})
