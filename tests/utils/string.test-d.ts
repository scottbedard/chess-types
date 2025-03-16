import { assertType, test } from 'vitest'
import type { Includes, Int, IsLength, Replace } from '@/utils/string'

test('Includes<T, U>', () => {
  assertType<Includes<'Hello', 'H'>>(true) // <- first
  assertType<Includes<'Hello', 'e'>>(true) // <- middle
  assertType<Includes<'Hello', 'o'>>(true) // <- last
  assertType<Includes<'Hello', 'x'>>(false) // <- not in string
})

test('Int<T>', () => {
  assertType<Int<'0'>>(0)
  assertType<Int<'1'>>(1)
  assertType<Int<'1234'>>(1234)
  assertType<Int<'-1'>>(0 as never)
  assertType<Int<'1.1'>>(0 as never)
  assertType<Int<'whoops'>>(0 as never)
})

test('IsLength<T, U>', () => {
  assertType<IsLength<'Hello', 5>>(true) // <- exact
  assertType<IsLength<'Hello', 4>>(false) // <- less
  assertType<IsLength<'Hello', 6>>(false) // <- more
})

test('Replace<T, U, V>', () => {
  assertType<Replace<'foobar', 'bar', 'baz'>>('foobaz')
  assertType<Replace<'foobar', 'hello', 'baz'>>('foobar')
})
