import { assertType, test } from 'vitest'

import type {
  Increment,
} from '@/utils'

test('Increment<T>', () => {
  type Result = Increment<0>

  assertType<Result>(1)

  type Result2 = Increment<Result>

  assertType<Result2>(2)
})
