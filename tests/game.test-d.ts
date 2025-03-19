import { assertType, describe, test } from 'vitest'
import type { CurrentMovesUnsafe, FindKing, _OccupiedBy } from '@/game'
import type { ParseFen } from '@/notation'

describe('OccupiedBy<Color, Game>', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    assertType<_OccupiedBy<'b', Game>>([])
    assertType<_OccupiedBy<'w', Game>>([])
  })

  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    assertType<_OccupiedBy<'b', Game>>([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    ])

    assertType<_OccupiedBy<'w', Game>>([
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63
    ])
  })

  test('mid-game position', () => {
    type Game = ParseFen<'2b3k1/6pp/4p3/2p5/4p3/4K3/P1P3PP/7R b - - 1 23'>

    assertType<_OccupiedBy<'b', Game>>([
      2, 6, 14, 15, 20, 26, 36
    ])

    assertType<_OccupiedBy<'w', Game>>([
      44, 48, 50, 54, 55, 63
    ])
  })
})

describe('CurrentMovesUnsafe<Game>', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type Result = CurrentMovesUnsafe<Game>

    assertType<Result>([])
  })

  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Result = CurrentMovesUnsafe<Game>

    assertType<Result>([
      'a2a3', 'a2a4', 'b2b3', 'b2b4', 'c2c3', 'c2c4', 'd2d3', 'd2d4',
      'e2e3', 'e2e4', 'f2f3', 'f2f4', 'g2g3', 'g2g4', 'h2h3', 'h2h4',
      'b1a3', 'b1c3', 'g1f3', 'g1h3'
    ])
  })

  test('starting position, alternate color', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Result = CurrentMovesUnsafe<Game, 'b'>

    assertType<Result>([
      'b8a6', 'b8c6', 'g8f6', 'g8h6', 'a7a6', 'a7a5', 'b7b6', 'b7b5',
      'c7c6', 'c7c5', 'd7d6', 'd7d5', 'e7e6', 'e7e5', 'f7f6', 'f7f5',
      'g7g6', 'g7g5', 'h7h6', 'h7h5'
    ])
  })
})

describe('FindKing<Game, Color>', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type Black = FindKing<Game, 'b'>
    type White = FindKing<Game, 'w'>

    assertType<Black>(false)
    assertType<White>(false)
  })

  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Black = FindKing<Game, 'b'>
    type White = FindKing<Game, 'w'>

    assertType<Black>('e8')
    assertType<White>('e1')
  })
})
