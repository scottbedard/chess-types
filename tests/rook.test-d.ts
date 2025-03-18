import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { Position, ToPositions } from '@/board'
import type { RookMoves } from '@/pieces/rook'

describe('RookMoves<Game, Color, From>', () => {
  test('a1', () => {
    type Game = ParseFen<'q7/8/8/8/8/8/8/7Q w - - 0 1'>

    type Result = ToPositions<RookMoves<Game, 'w', Position['a1']>>

    assertType<Result>(['a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1'])
  })

  test('d4', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<RookMoves<Game, 'w', Position['d4']>>

    assertType<Result>(['d5', 'd6', 'd7', 'd8', 'c4', 'b4', 'a4', 'e4', 'f4', 'g4', 'h4', 'd3', 'd2', 'd1'])
  })
})
