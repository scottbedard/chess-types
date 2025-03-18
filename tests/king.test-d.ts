import { assertType, describe, test } from 'vitest'
import type { KingMoves } from '@/pieces/king'
import type { ParseFen, ToSans } from '@/notation'
import type { PositionIndex } from '@/base'

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

  test('white castle short', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R2PK2R w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1f1', 'e1g1'
    ])
  })

  test('white castle blocked 1', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R2PKP1R w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([])
  })

  test('white castle short blocked 2', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R2PK1PR w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1f1'
    ])
  })

  test('white castle short without rook', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R2PK3 w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1f1'
    ])
  })

  test('white castle short without rights', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R2PK2R w Qkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1f1'
    ])
  })

  test('white castle long', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R3KP1R w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1d1', 'e1c1'
    ])
  })

  test('white castle long blocked 2', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R1P1KP2 w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1d1'
    ])
  })

  test('white castle long blocked 3', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/RP2KP2 w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1d1'
    ])
  })

  test('white castle long without rook', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/4KP2 w KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1d1'
    ])
  })

  test('white castle long without rights', () => {
    type Game = ParseFen<'r3k2r/8/8/8/8/8/3PPP2/R3KP2 w Kkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'w', PositionIndex['e1']>>

    assertType<Result>([
      'e1d1'
    ])
  })

  test('black castle short', () => {
    type Game = ParseFen<'r2pk2r/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8f8', 'e8g8'
    ])
  })

  test('black castle blocked 1', () => {
    type Game = ParseFen<'r2pkp1r/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([])
  })

  test('black castle short blocked 2', () => {
    type Game = ParseFen<'r2pk1pr/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8f8'
    ])
  })

  test('black castle short without rook', () => {
    type Game = ParseFen<'r2pk3/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8f8'
    ])
  })

  test('black castle short without rights', () => {
    type Game = ParseFen<'r2pk2r/3ppp2/8/8/8/8/8/8 b KQq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8f8'
    ])
  })

  test('black castle long', () => {
    type Game = ParseFen<'r2pk2r/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8f8', 'e8g8'
    ])
  })

  test('black castle long blocked 2', () => {
    type Game = ParseFen<'r1p1kp1r/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8d8'
    ])
  })

  test('black castle long blocked 3', () => {
    type Game = ParseFen<'rp2kp1r/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8d8'
    ])
  })

  test('black castle long without rook', () => {
    type Game = ParseFen<'4kp1r/3ppp2/8/8/8/8/8/8 b KQkq - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8d8'
    ])
  })

  test('black castle long without rights', () => {
    type Game = ParseFen<'r3kp1r/3ppp2/8/8/8/8/8/8 b KQk - 0 1'>

    type Result = ToSans<KingMoves<Game, 'b', PositionIndex['e8']>>

    assertType<Result>([
      'e8d8',
    ])
  })
})
