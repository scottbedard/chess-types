import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { PositionIndex } from '@/board'
import type { KingMoves } from '@/pieces/king'
import type { ToSans } from '@/formatters'

describe('KingMoves<Game, Color, From>', () => {
  test('c6', () => {
    type Game = ParseFen<'8/2pP4/2K5/8/8/8/8/8 w - - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['c6']>>

    assertType<Result>([
      'c6b7', 'c6c7', 'c6b6', 'c6d6', 'c6b5', 'c6c5', 'c6d5'
    ])
  })

  test('h4', () => {
    type Game = ParseFen<'8/8/8/8/7K/8/8/8 w - - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['h4']>>

    assertType<Result>([
      'h4g5', 'h4h5', 'h4g4', 'h4g3', 'h4h3'
    ])
  })
})
