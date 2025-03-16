import { assertType, test } from 'vitest'
import type { Includes } from '@/utils/string'

test('Includes<T, U>', () => {
  assertType<Includes<'Hello', 'H'>>(true) // <- first
  assertType<Includes<'Hello', 'e'>>(true) // <- middle
  assertType<Includes<'Hello', 'o'>>(true) // <- last
  assertType<Includes<'Hello', 'x'>>(false) // <- not in string
})
