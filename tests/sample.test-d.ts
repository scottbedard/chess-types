import { assertType, test } from 'vitest'

type Negate<T extends boolean> = T extends true ? false : true

test('sample', () => {
  assertType<Negate<true>>(false)
})