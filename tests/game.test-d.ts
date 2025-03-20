import { assertType, describe, test } from 'vitest'
import type { CurrentMovesUnsafe, FindKing, OccupiedBy } from '@/game'
import type { ParseFen } from '@/notation'

describe('OccupiedBy<Color, Game>', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    assertType<OccupiedBy<Game, 'b'>>([])
    assertType<OccupiedBy<Game, 'w'>>([])
  })

  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Black = OccupiedBy<Game, 'b'>

    type White = OccupiedBy<Game, 'w'>

    assertType<Black>([
      'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8', 'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'
    ])

    assertType<White>([
      'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2', 'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
    ])
  })

  test('mid-game position', () => {
    type Game = ParseFen<'2b3k1/6pp/4p3/2p5/4p3/4K3/P1P3PP/7R b - - 1 23'>

    type Black = OccupiedBy<Game, 'b'>

    type White = OccupiedBy<Game, 'w'>

    assertType<Black>([
      'c8', 'g8', 'g7', 'h7', 'e6', 'c5', 'e4'
    ])

    assertType<White>([
      'e3', 'a2', 'c2', 'g2', 'h2', 'h1'
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
