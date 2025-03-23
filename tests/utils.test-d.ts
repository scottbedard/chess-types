import { assertType, test } from 'vitest'

import type {
  Increment,
  IsGreater,
  Sum,
} from '@/utils'

test('Increment<T>', () => {
  type Result = Increment<0>

  assertType<Result>(1)

  type Result2 = Increment<Result>

  assertType<Result2>(2)
})

test('IsGreater<A, B>', () => {
  type Test1 = IsGreater<-1, 1>
  type Test2 = IsGreater<1, -1>
  type Test3 = IsGreater<-3, -2>
  type Test4 = IsGreater<-2, -3>

  assertType<Test1>(false)
  assertType<Test2>(true)
  assertType<Test3>(false)
  assertType<Test4>(true)
})

test('Sum<A, B>', () => {
  type Test1 = Sum<10, 10>
  type Test2 = Sum<-10, 10>
  type Test3 = Sum<10, -10>
  type Test4 = Sum<5, -10>
  type Test5 = Sum<10, -5>
  type test6 = Sum<-5, 10>
  type Test7 = Sum<-10, 5>
  type Test8 = Sum<-10, -10>

  assertType<Test1>(20)
  assertType<Test2>(0)
  assertType<Test3>(0)
  assertType<Test4>(-5)
  assertType<Test5>(5)
  assertType<test6>(5)
  assertType<Test7>(-5)
  assertType<Test8>(-20)
})
