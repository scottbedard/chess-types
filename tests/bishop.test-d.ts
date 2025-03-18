import { assertType, describe, test } from 'vitest'
import type { BishopMoves } from '@/pieces/bishop'
import type { ParseFen } from '@/parsers'
import type { PositionIndex, ToPositions } from '@/board'

describe('BishopMoves<Game, Color, From>', () => {
  test('c3', () => {
    type Game = ParseFen<'8/6r1/8/8/8/2B5/8/4R3 w - - 0 1'>

    type Result = ToPositions<BishopMoves<Game, 'w', PositionIndex['c3']>>

    assertType<Result>([
      'b4', 'a5', 'd4', 'e5', 'f6', 'g7', 'b2', 'a1', 'd2'
    ])
  })

  test('e4', () => {
    type Game = ParseFen<'8/8/8/8/4b3/8/8/8 b - - 0 1'>

    type Result = ToPositions<BishopMoves<Game, 'w', PositionIndex['e4']>>

    assertType<Result>([
      'd5', 'c6', 'b7', 'a8', 'f5', 'g6', 'h7', 'd3', 'c2', 'b1', 'f3', 'g2', 'h1'
    ])
  })
})
