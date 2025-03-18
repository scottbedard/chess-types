import { assertType, describe, test } from 'vitest'
import type { ParseFen, ToSans } from '@/notation'
import type { PositionIndex } from '@/base'
import type { QueenMoves } from '@/pieces/queen'

describe('QueenMoves<Game, Color, From>', () => {
  test('a1', () => {
    type Game = ParseFen<'q7/8/8/8/8/8/8/7Q w - - 0 1'>

    type Result = ToSans<QueenMoves<Game, 'w', PositionIndex['a1']>>

    assertType<Result>([
      'a1a2', 'a1a3', 'a1a4', 'a1a5', 'a1a6', 'a1a7', 'a1a8', 'a1b2', 'a1c3', 'a1d4', 'a1e5', 'a1f6', 'a1g7', 'a1h8', 'a1b1', 'a1c1', 'a1d1', 'a1e1', 'a1f1', 'a1g1'
    ])
  })

  test('c3', () => {
    type Game = ParseFen<'8/2R3r1/8/8/8/2Q5/8/8 w - - 0 1'>

    type Result = ToSans<QueenMoves<Game, 'w', PositionIndex['c3']>>

    assertType<Result>([
      'c3b4', 'c3a5', 'c3c4', 'c3c5', 'c3c6', 'c3d4', 'c3e5', 'c3f6', 'c3g7', 'c3b3', 'c3a3', 'c3d3', 'c3e3', 'c3f3', 'c3g3', 'c3h3', 'c3b2', 'c3a1', 'c3c2', 'c3c1', 'c3d2', 'c3e1'
    ])
  })
})
