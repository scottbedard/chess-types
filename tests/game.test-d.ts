import { assertType, describe, test } from 'vitest'
import type { OccupiedBy } from '@/game'
import type { ParseFen } from '@/notation'

describe('OccupiedBy<Color, Game>', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    assertType<OccupiedBy<'b', Game>>([])
    assertType<OccupiedBy<'w', Game>>([])
  })

  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    assertType<OccupiedBy<'b', Game>>([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
    ])

    assertType<OccupiedBy<'w', Game>>([
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63
    ])
  })

  test('mid-game position', () => {
    type Game = ParseFen<'2b3k1/6pp/4p3/2p5/4p3/4K3/P1P3PP/7R b - - 1 23'>

    assertType<OccupiedBy<'b', Game>>([
      2, 6, 14, 15, 20, 26, 36
    ])

    assertType<OccupiedBy<'w', Game>>([
      44, 48, 50, 54, 55, 63
    ])
  })
})
