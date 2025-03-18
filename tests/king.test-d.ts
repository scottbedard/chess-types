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
    // ...
  })

  test('white castle short blocked 1', () => {
    // ...
  })

  test('white castle short blocked 2', () => {
    // ...
  })

  test('white castle short without rights', () => {
    // ...
  })

  test('white castle long', () => {
    // ...
  })

  test('white castle long blocked 1', () => {
    // ...
  })

  test('white castle long blocked 2', () => {
    // ...
  })

  test('white castle long blocked 3', () => {
    // ...
  })

  test('white castle long without rights', () => {
    // ...
  })

  test('black castle short', () => {
    // ...
  })

  test('black castle short blocked 1', () => {
    // ...
  })

  test('black castle short blocked 2', () => {
    // ...
  })

  test('black castle short without rights', () => {
    // ...
  })

  test('black castle long', () => {
    // ...
  })

  test('black castle long blocked 1', () => {
    // ...
  })

  test('black castle long blocked 2', () => {
    // ...
  })

  test('black castle long blocked 3', () => {
    // ...
  })

  test('black castle long without rights', () => {
    // ...
  })
})
