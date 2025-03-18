import { assertType, describe, test } from 'vitest'
import type { KnightMoves } from '@/pieces/knight'
import type { ParseFen } from '@/parsers'
import type { PositionIndex, ToPositions } from '@/board'

describe('KnightMoves<Game, Color, From>', () => {
  test('e5', () => {
    type Game = ParseFen<'8/3r4/6R1/4N3/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<KnightMoves<Game, 'w', PositionIndex['e5']>>

    assertType<Result>([
      'd7', 'c6', 'f7', 'c4', 'd3', 'g4', 'f3'
    ])
  })

  test('c2', () => {
    type Game = ParseFen<'8/8/8/8/8/8/2n5/8 b - - 0 1'>

    type Result = ToPositions<KnightMoves<Game, 'w', PositionIndex['c2']>>

    assertType<Result>([
      'b4', 'a3', 'd4', 'e3', 'a1', 'e1'
    ])
  })
})
