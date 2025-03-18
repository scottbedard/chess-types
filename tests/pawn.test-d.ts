import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/parsers'
import type { PawnMoves } from '@/pieces/pawn'
import type { PositionIndex } from '@/base'
import type { ToSans } from '@/formatters'

describe('PawnMoves<Game, Color, From>', () => {
  test('white advance forward', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['e2']>>

    assertType<Result>([
      'e2e3', 'e2e4'
    ])
  })

  test('white advance forward blocked friendly', () => {
    type Game = ParseFen<'8/8/8/8/8/3P4/3P4/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['d2']>>

    assertType<Result>([])
  })

  test('white advance forward blocked enemy', () => {
    type Game = ParseFen<'8/8/8/8/8/3p4/3P4/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['d2']>>

    assertType<Result>([])
  })

  test('white second advance two blocked friendly', () => {
    type Game = ParseFen<'8/8/8/8/3P4/8/3P4/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['d2']>>

    assertType<Result>(['d2d3'])
  })

  test('white second advance two blocked enemy', () => {
    type Game = ParseFen<'8/8/8/8/3p4/8/3P4/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['d2']>>

    assertType<Result>(['d2d3'])
  })

  test('white capture portside', () => {
    type Game = ParseFen<'8/8/8/8/8/2r2r2/3PP3/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['d2']>>

    assertType<Result>([
      'd2d3', 'd2d4', 'd2c3'
    ])
  })

  test('white capture starboard', () => {
    type Game = ParseFen<'8/8/8/8/8/2r2r2/3PP3/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['e2']>>

    assertType<Result>([
      'e2e3', 'e2e4', 'e2f3'
    ])
  })

  test('no friendly capture', () => {
    type Game = ParseFen<'8/8/3pp3/2r2r2/2R2R2/3PP3/8/8 w - - 0 1'>

    type BlackPortside = ToSans<PawnMoves<Game, 'b', PositionIndex['d6']>>
    type BlackStarboard = ToSans<PawnMoves<Game, 'b', PositionIndex['e6']>>
    type WhitePortside = ToSans<PawnMoves<Game, 'w', PositionIndex['d3']>>
    type WhiteStarboard = ToSans<PawnMoves<Game, 'w', PositionIndex['e3']>>

    assertType<BlackPortside>(['d6d5'])
    assertType<BlackStarboard>(['e6e5'])
    assertType<WhitePortside>(['d3d4'])
    assertType<WhiteStarboard>(['e3e4'])
  })

  test('only advance twice from starting position', () => {
    type Game = ParseFen<'8/8/4p3/8/8/3P4/8/8 w - - 0 1'>

    type BlackResult = ToSans<PawnMoves<Game, 'b', PositionIndex['e6']>>
    type WhiteResult = ToSans<PawnMoves<Game, 'w', PositionIndex['d3']>>

    assertType<BlackResult>(['e6e5'])
    assertType<WhiteResult>(['d3d4'])
  })

  test('white en passant portside', () => {
    // ...
    type Game = ParseFen<'8/8/8/3pP3/8/8/8/8 w - d6 0 2'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['e5']>>

    assertType<Result>(['e5e6', 'e5d6'])
  })

  test('white en passant starboard', () => {
    type Game = ParseFen<'8/8/8/3Pp3/8/8/8/8 w - e6 0 2'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['d5']>>

    assertType<Result>(['d5d6', 'd5e6'])
  })

  test('black advance forward', () => {
    type Game = ParseFen<'8/4p3/8/8/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e7']>>

    assertType<Result>(['e7e6', 'e7e5'])
  })

  test('black advance forward blocked friendly', () => {
    type Game = ParseFen<'8/4p3/4p3/8/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e7']>>

    assertType<Result>([])
  })

  test('black advance forward blocked enemy', () => {
    type Game = ParseFen<'8/4p3/4P3/8/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e7']>>

    assertType<Result>([])
  })

  test('black second advance forward two blocked friendly', () => {
    type Game = ParseFen<'8/4p3/8/4p3/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e7']>>

    assertType<Result>(['e7e6'])
  })

  test('black second advance forward two blocked enemy', () => {
    type Game = ParseFen<'8/4p3/8/4P3/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e7']>>

    assertType<Result>(['e7e6'])
  })

  test('black capture portside', () => {
    type Game = ParseFen<'8/8/3pp3/2R2R2/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e6']>>

    assertType<Result>(['e6e5', 'e6f5'])
  })

  test('black capture starboard', () => {
    type Game = ParseFen<'8/8/3pp3/2R2R2/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['d6']>>

    assertType<Result>(['d6d5', 'd6c5'])
  })

  test('black en passant portside', () => {
    type Game = ParseFen<'8/8/8/8/3pP3/8/8/8 b - e3 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['d4']>>

    assertType<Result>(['d4d3', 'd4e3'])
  })

  test('black en passant starboard', () => {
    type Game = ParseFen<'8/8/8/8/3Pp3/8/8/8 b - d3 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e4']>>

    assertType<Result>(['e4e3', 'e4d3'])
  })

  test('white promotion', () => {
    type Game = ParseFen<'4r3/3P4/8/8/8/8/8/8 w - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'w', PositionIndex['d7']>>

    assertType<Result>([
      'd7d8Q', 'd7d8R', 'd7d8N', 'd7d8B', 'd7e8Q', 'd7e8R', 'd7e8N', 'd7e8B'
    ])
  })

  test('black promotion', () => {
    type Game = ParseFen<'8/8/8/8/8/8/4p3/3R4 b - - 0 1'>

    type Result = ToSans<PawnMoves<Game, 'b', PositionIndex['e2']>>

    assertType<Result>([
      'e2e1q', 'e2e1r', 'e2e1n', 'e2e1b', 'e2d1q', 'e2d1r', 'e2d1n', 'e2d1b'
    ])
  })
})
