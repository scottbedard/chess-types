import { assertType, describe, test } from 'vitest'
import type { ParseFen } from '@/notation'
import type { Evaluate, NextMove } from '@/evaluate'
import type { NewGame } from '@/game'

test('Evaluate', () => {
  type Result = Evaluate<NewGame>

  assertType<Result>(0)
})

describe('NextMove<Game>', () => {
  test('white captures stronger piece', () => {
    type ShouldCaptureE5 = ParseFen<'8/8/8/2p1q3/3P4/8/8/8 w - - 0 1'>
    type ShouldCaptureC5 = ParseFen<'8/8/8/2q1p3/3P4/8/8/8 w - - 0 1'>

    type Result1 = NextMove<ShouldCaptureE5>
    type Result2 = NextMove<ShouldCaptureC5>

    assertType<Result1>('d4e5')
    assertType<Result2>('d4c5')
  })

  test('white promotes to strongest piece', () => {
    type Game = ParseFen<'8/3P4/8/8/8/8/8/8 w - - 0 1'>

    type Result = NextMove<Game>

    assertType<Result>('d7d8Q')
  })

  test('black captures stronger piece', () => {
    type ShouldCaptureD4 = ParseFen<'8/8/8/4p3/3Q1P2/8/8/8 b - - 0 1'>
    type ShouldCaptureF4 = ParseFen<'8/8/8/4p3/3P1Q2/8/8/8 b - - 0 1'>

    type Result1 = NextMove<ShouldCaptureD4>
    type Result2 = NextMove<ShouldCaptureF4>

    assertType<Result1>('e5d4')
    assertType<Result2>('e5f4')
  })
})
