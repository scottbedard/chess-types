import { assertType, describe, test } from 'vitest'
import type { KnightMoves } from '@/pieces/knight'
import type { ParseFen } from '@/parsers'
import type { PositionIndex } from '@/board'
import { ToSans } from '@/formatters'

describe('KnightMoves<Game, Color, From>', () => {
  test('e5', () => {
    type Game = ParseFen<'8/3r4/6R1/4N3/8/8/8/8 w - - 0 1'>

    type Result = ToSans<KnightMoves<Game, 'w', PositionIndex['e5']>>

    assertType<Result>([
      'e5d7', 'e5c6', 'e5f7', 'e5c4', 'e5d3', 'e5g4', 'e5f3'
    ])
  })

  test('c2', () => {
    type Game = ParseFen<'8/8/8/8/8/8/2n5/8 b - - 0 1'>

    type Result = ToSans<KnightMoves<Game, 'w', PositionIndex['c2']>>

    assertType<Result>([
      'c2b4', 'c2a3', 'c2d4', 'c2e3', 'c2a1', 'c2e1'
    ])
  })
})
