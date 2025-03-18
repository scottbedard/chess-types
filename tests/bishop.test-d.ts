import { assertType, describe, test } from 'vitest'
import type { BishopMoves } from '@/pieces/bishop'
import type { ParseFen } from '@/parsers'
import type { PositionIndex } from '@/board'
import type { ToSans } from '@/formatters'

describe('BishopMoves<Game, Color, From>', () => {
  test('c3', () => {
    type Game = ParseFen<'8/6r1/8/8/8/2B5/8/4R3 w - - 0 1'>

    type Result = ToSans<BishopMoves<Game, 'w', PositionIndex['c3']>>

    assertType<Result>([
      'c3b4', 'c3a5', 'c3d4', 'c3e5', 'c3f6', 'c3g7', 'c3b2', 'c3a1', 'c3d2'
    ])
  })

  test('e4', () => {
    type Game = ParseFen<'8/8/8/8/4b3/8/8/8 b - - 0 1'>

    type Result = ToSans<BishopMoves<Game, 'w', PositionIndex['e4']>>

    assertType<Result>([
      'e4d5', 'e4c6', 'e4b7', 'e4a8', 'e4f5', 'e4g6', 'e4h7', 'e4d3', 'e4c2', 'e4b1', 'e4f3', 'e4g2', 'e4h1'
    ])
  })
})
