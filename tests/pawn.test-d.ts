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

  test('white capture portside', () => {
    type Game = ParseFen<'8/8/8/8/8/2r2r2/3PP3/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'w', Position['d2']>>

    assertType<Result>([
      'd3', 'd4', 'c3'
    ])
  })

  test('white capture starboard', () => {
    type Game = ParseFen<'8/8/8/8/8/2r2r2/3PP3/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'w', Position['e2']>>

    assertType<Result>([
      'e3', 'e4', 'f3'
    ])
  })

  test('no friendly capture', () => {
    type Game = ParseFen<'8/8/3pp3/2r2r2/2R2R2/3PP3/8/8 w - - 0 1'>

    type BlackPortside = ToPositions<PawnMoves<Game, 'b', Position['d6']>>
    type BlackStarboard = ToPositions<PawnMoves<Game, 'b', Position['e6']>>
    type WhitePortside = ToPositions<PawnMoves<Game, 'w', Position['d3']>>
    type WhiteStarboard = ToPositions<PawnMoves<Game, 'w', Position['e3']>>

    assertType<BlackPortside>(['d5'])
    assertType<BlackStarboard>(['e5'])
    assertType<WhitePortside>(['d4'])
    assertType<WhiteStarboard>(['e4'])
  })

  test('only advance twice from starting position', () => {
    type Game = ParseFen<'8/8/4p3/8/8/3P4/8/8 w - - 0 1'>

    type BlackResult = ToPositions<PawnMoves<Game, 'b', Position['e6']>>
    type WhiteResult = ToPositions<PawnMoves<Game, 'w', Position['d3']>>

    assertType<BlackResult>(['e5'])
    assertType<WhiteResult>(['d4'])
  })

  test('white en passant portside', () => {
    // ...
  })

  test('white en passant starboard', () => {
    // ...
  })

  test('white promotion', () => {
    // ...
  })

  test('black advance forward', () => {
    type Game = ParseFen<'8/4p3/8/8/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'b', Position['e7']>>

    assertType<Result>(['e6', 'e5'])
  })

  test('black advance forward blocked friendly', () => {
    type Game = ParseFen<'8/4p3/4p3/8/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'b', Position['e7']>>

    assertType<Result>([])
  })

  test('black advance forward blocked enemy', () => {
    type Game = ParseFen<'8/4p3/4P3/8/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'b', Position['e7']>>

    assertType<Result>([])
  })

  test('black second advance forward two blocked friendly', () => {
    type Game = ParseFen<'8/4p3/8/4p3/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'b', Position['e7']>>

    assertType<Result>(['e6'])
  })

  test('black second advance forward two blocked enemy', () => {
    type Game = ParseFen<'8/4p3/8/4P3/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'b', Position['e7']>>

    assertType<Result>(['e6'])
  })

  test('black capture portside', () => {
    type Game = ParseFen<'8/8/3pp3/2R2R2/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'b', Position['e6']>>

    assertType<Result>(['e5', 'f5'])
  })

  test('black capture starboard', () => {
    type Game = ParseFen<'8/8/3pp3/2R2R2/8/8/8/8 w - - 0 1'>

    type Result = ToPositions<PawnMoves<Game, 'b', Position['d6']>>

    assertType<Result>(['d5', 'c5'])
  })

  test('black en passant portside', () => {
    // ...
  })

  test('black en passant starboard', () => {
    // ...
  })

  test('black promotion', () => {
    // ...
  })
})
