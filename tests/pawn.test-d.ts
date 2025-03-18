import { assertType, describe, test } from 'vitest'
import type { PawnMoves } from '@/pieces/pawn'
import type { ParseFen } from '@/parsers'
import type { Position, ToPositions } from '@/board'

describe('PawnMoves<Game, Color, From>', () => {
  test('white advance forward', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'w', Position['e2']>>

    assertType<Result>([
      'e3', 'e4',
    ])
  })

  test('white advance forward blocked friendly', () => {
    type Game = ParseFen<'8/8/8/8/8/3P4/3P4/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'w', Position['d2']>>

    assertType<Result>([])
  })

  test('white advance forward blocked enemy', () => {
    type Game = ParseFen<'8/8/8/8/8/3p4/3P4/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'w', Position['d2']>>

    assertType<Result>([])
  })

  test('white second advance two blocked friendly', () => {
    type Game = ParseFen<'8/8/8/8/3P4/8/3P4/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'w', Position['d2']>>

    assertType<Result>(['d3'])
  })

  test('white second advance two blocked enemy', () => {
    type Game = ParseFen<'8/8/8/8/3p4/8/3P4/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'w', Position['d2']>>

    assertType<Result>(['d3'])
  })

  // white capture portside

  // white capture starboard

  // white en passant portside

  // white en passant starboard

  // white promotion

  // black advance forward

  // black advance forward blocked friendly

  // black advance forward blocked enemy

  // black advance forward two blocked friendly

  // black advance forward two blocked enemy

  // black capture portside

  // black capture starboard

  // black en passant portside

  // black en passant starboard

  // black promotion
})
