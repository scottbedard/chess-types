import { assertType, describe, test } from 'vitest'
import type { ParseBoard, ParseCastling, ParseFen } from '@/parsers'

describe('ParseBoard<T>', () => {
  test('success', () => {
    type Result = ParseBoard<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'>

    assertType<Result>('rnbqkbnrpppppppp________________________________PPPPPPPPRNBQKBNR')
  })

  test('fail, invalid characters', () => {
    type Result = ParseBoard<'xnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'> // <- leading x

    assertType<Result>(0 as never)
  })

  test('fail, board overflow', () => {
    type Result = ParseBoard<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNRp'> extends never ? true : false // <- extra pawn

    assertType<Result>(true)
  })

  test('fail, board underflow', () => {
    type Test1 = ParseBoard<'rnbqkbnr/pppppppp/8/7/8/8/PPPPPPPP/RNBQKBNR'> extends never ? true : false // <- missing empty square
    type Test2 = ParseBoard<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN'> extends never ? true : false // <- missing last piece

    assertType<Test1>(true)
    assertType<Test2>(true)
  })
})

describe('ParseCastling<T>', () => {
  test('Kq', () => {
    type Result = ParseCastling<'Kq'>

    assertType<Result>({
      k: false,
      q: true,
      K: true,
      Q: false,
    })
  })

  test('-', () => {
    type Result = ParseCastling<'-'>

    assertType<Result>({
      K: false,
      Q: false,
      k: false,
      q: false,
    })
  })
})

describe('ParseFen<T>', () => {
  test('success', () => {
    type Result = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    assertType<Result>({
      board: 'rnbqkbnrpppppppp________________________________PPPPPPPPRNBQKBNR',
      turn: 'w',
      castling: {
        k: true,
        q: true,
        K: true,
        Q: true,
      },
      ep: '-',
      halfmove: 0,
      fullmove: 1,
    })
  })

  test('fail, invalid turn color', () => {
    type Result = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR x KQkq - 0 1'> extends never ? true : false

    assertType<Result>(true)
  })

  test('fail, invalid non-integer halfmove', () => {
    type Result = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0.5 1'> extends never ? true : false

    assertType<Result>(true)
  })

  test('fail, negative halfmove', () => {
    type Result = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - -1 1'> extends never ? true : false

    assertType<Result>(true)
  })

  test('fail, invalid non-integer halfmove', () => {
    type Result = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1.5'> extends never ? true : false

    assertType<Result>(true)
  })

  test('fail, negative fullmove', () => {
    type Result = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 -1'> extends never ? true : false

    assertType<Result>(true)
  })
})
