import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { Step, Walk } from '@/board'

describe('Step<From, Direction>', () => {
  test('a1', () => {
    assertType<(Step<'a1', 0> extends never ? true : false)>(true)
    assertType<(Step<'a1', 1> extends 'a2' ? true : false)>(true)
    assertType<(Step<'a1', 2> extends 'b2' ? true : false)>(true)
    assertType<(Step<'a1', 3> extends never ? true : false)>(true)
    assertType<(Step<'a1', 4> extends 'a1' ? true : false)>(true)
    assertType<(Step<'a1', 5> extends 'b1' ? true : false)>(true)
    assertType<(Step<'a1', 6> extends never ? true : false)>(true)
    assertType<(Step<'a1', 7> extends never ? true : false)>(true)
    assertType<(Step<'a1', 8> extends never ? true : false)>(true)
  })

  test('b7', () => {
    assertType<(Step<'b7', 0> extends 'a8' ? true : false)>(true)
    assertType<(Step<'b7', 1> extends 'b8' ? true : false)>(true)
    assertType<(Step<'b7', 2> extends 'c8' ? true : false)>(true)
    assertType<(Step<'b7', 3> extends 'a7' ? true : false)>(true)
    assertType<(Step<'b7', 4> extends 'b7' ? true : false)>(true)
    assertType<(Step<'b7', 5> extends 'c7' ? true : false)>(true)
    assertType<(Step<'b7', 6> extends 'a6' ? true : false)>(true)
    assertType<(Step<'b7', 7> extends 'b6' ? true : false)>(true)
    assertType<(Step<'b7', 8> extends 'c6' ? true : false)>(true)
  })
})

describe('Walk<From, Direction>', () => {
  test('north until friendly', () => {
    type Game = ParseFen<'8/3Q4/8/8/8/8/3Q4/8 w - - 0 1'>

    assertType<Walk<Game, 'w', 'd2', 1>>(['d3', 'd4', 'd5', 'd6'])
  })

  test('northeast until hostile', () => {
    type Game = ParseFen<'7Q/8/8/8/8/8/8/8 w - - 0 1'>

    assertType<Walk<Game, 'b', 'a1', 2>>(['b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'])
  })

  test.skip('east until edge of board', () => {
    // type Game = ParseFen<'8/8/8/8/Q7/8/8/8 w - - 0 1'>

    // assertType<Walk<Game, 'b', 'a4', 5>>(['b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'])
  })
})
