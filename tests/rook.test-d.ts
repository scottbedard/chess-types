import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { PositionIndex } from '@/base'
import type { RookMoves } from '@/pieces/rook'
import type { ToSans } from '@/formatters'

describe('RookMoves<Game, Color, From>', () => {
  test('a1', () => {
    type Game = ParseFen<'q7/8/8/8/8/8/8/7Q w - - 0 1'>

    type Result = ToSans<RookMoves<Game, 'w', PositionIndex['a1']>>

    assertType<Result>(['a1a2', 'a1a3', 'a1a4', 'a1a5', 'a1a6', 'a1a7', 'a1a8', 'a1b1', 'a1c1', 'a1d1', 'a1e1', 'a1f1', 'a1g1'])
  })

  test('d4', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w - - 0 1'>

    type Result = ToSans<RookMoves<Game, 'w', PositionIndex['d4']>>

    assertType<Result>(['d4d5', 'd4d6', 'd4d7', 'd4d8', 'd4c4', 'd4b4', 'd4a4', 'd4e4', 'd4f4', 'd4g4', 'd4h4', 'd4d3', 'd4d2', 'd4d1'])
  })
})
