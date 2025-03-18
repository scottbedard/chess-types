import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { PositionIndex, ToPositions } from '@/board'
import type { KingMoves } from '@/pieces/king'

describe('KingMoves<Game, Color, From>', () => {
  test('c6', () => {
    type Game = ParseFen<'8/2pP4/2K5/8/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<KingMoves<Game, 'w', PositionIndex['c6']>>

    assertType<Result>([
      'b7', 'c7', 'b6', 'd6', 'b5', 'c5', 'd5'
    ])
  })

  test('h4', () => {
    type Game = ParseFen<'8/8/8/8/7K/8/8/8 w - - 0 1'>

    type Result = ToPositions<KingMoves<Game, 'w', PositionIndex['h4']>>

    assertType<Result>([
      'g5', 'h5', 'g4', 'g3', 'h3'
    ])
  })
})
