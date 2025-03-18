import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { WalkPositions } from '@/board'

describe('WalkPositions<Game, Color, From, Direction>', () => {
  test('north until friendly piece', () => {
    type Game = ParseFen<'8/3Q4/8/8/8/8/3Q4/8 w - - 0 1'>
    type Result = WalkPositions<Game, 'w', 'd2', 1>

    assertType<Result>(['d3', 'd4', 'd5', 'd6'])
  })

  test('north east until hostile piece', () => {
    type Game = ParseFen<'7Q/8/8/8/8/8/8/8 w - - 0 1'>
    type Result = WalkPositions<Game, 'b', 'a1', 2>

    assertType<Result>(['b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'])
  })

  test('south west until edge of board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w - - 0 1'>
    type Result = WalkPositions<Game, 'w', 'f8', 6>

    assertType<Result>(['e7', 'd6', 'c5', 'b4', 'a3'])
  })

  test('north west until edge of board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w - - 0 1'>
    type Result = WalkPositions<Game, 'b', 'h1', 0>

    assertType<Result>(['g2', 'f3', 'e4', 'd5', 'c6', 'b7', 'a8'])
  })
})
