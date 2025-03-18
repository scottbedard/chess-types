import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { PositionIndex, ToPositions } from '@/board'
import type { QueenMoves } from '@/pieces/queen'

describe('QueenMoves<Game, Color, From>', () => {
  test('a1', () => {
    type Game = ParseFen<'q7/8/8/8/8/8/8/7Q w - - 0 1'>

    type Result = ToPositions<QueenMoves<Game, 'w', PositionIndex['a1']>>

    assertType<Result>([
      'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1'
    ])
  })

  test('c3', () => {
    type Game = ParseFen<'8/2R3r1/8/8/8/2Q5/8/8 w - - 0 1'>

    type Result = ToPositions<QueenMoves<Game, 'w', PositionIndex['c3']>>

    assertType<Result>([
      'b4', 'a5', 'c4', 'c5', 'c6', 'd4', 'e5', 'f6', 'g7', 'b3', 'a3', 'd3', 'e3', 'f3', 'g3', 'h3', 'b2', 'a1', 'c2', 'c1', 'd2', 'e1'
    ])
  })
})
