import { assertType, describe, test } from 'vitest'
import type { PositionIndex } from '@/base'

import type {
  FormatBoard,
  FormatCastling,
  FormatGame,
  FormatSan,
  ParseBoard,
  ParseCastling,
  ParseFen,
  ParseSan,
} from '@/notation'

describe('FormatBoard<T>', () => {
  test('initial position', () => {
    type Result = FormatBoard<'rnbqkbnrpppppppp________________________________PPPPPPPPRNBQKBNR'>

    assertType<Result>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  })

  test('empty board', () => {
    type Result = FormatBoard<'________________________________________________________________'>

    assertType<Result>('8/8/8/8/8/8/8/8')
  })

  test('partially empty ranks', () => {
    type Result = FormatBoard<'p_______pp______ppp_____pppp____ppppp___pppppp__ppppppp_pppppppp'>

    assertType<Result>('p7/pp6/ppp5/pppp4/ppppp3/pppppp2/ppppppp1/pppppppp')
  })

  test('error', () => {
    type Result = FormatBoard<'whoops'> extends never ? true : false

    assertType<Result>(true)
  })
})

describe('FormatCastling<T>', () => {
  test('all rights', () => {
    type Result = FormatCastling<{ K: true, Q: true, k: true, q: true }>

    assertType<Result>('KQkq')
  })

  test('no rights', () => {
    type Result = FormatCastling<{ K: false, Q: false, k: false, q: false }>

    assertType<Result>('-')
  })

  test('some rights', () => {
    type Result = FormatCastling<{ K: true, Q: false, k: true, q: false }>

    assertType<Result>('Kk')
  })
})

describe('FormatGame<T>', () => {
  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Result = FormatGame<Game>

    assertType<Result>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  })

  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type Result = FormatGame<Game>

    assertType<Result>('8/8/8/8/8/8/8/8 w KQkq - 0 1')
  })

  test('en passant', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'>

    type Result = FormatGame<Game>

    assertType<Result>('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1')
  })
})

describe('FormatSan<T>', () => {
  test('a7a8Q', () => {
    type Result = FormatSan<{
      from: PositionIndex['a7'],
      to: PositionIndex['a8'],
      promotion: 'Q'
    }>

    assertType<Result>('a7a8Q')
  })

  test('f5f6', () => {
    type Result = FormatSan<{
      from: PositionIndex['f5'],
      to: PositionIndex['f6'],
      promotion: ''
    }>

    assertType<Result>('f5f6')
  })
})

describe('ParseBoard<T>', () => {
  test('success', () => {
    type Result = ParseBoard<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'>

    assertType<Result>([
      'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
      'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
      'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
      'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
    ])
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
      board: [
        'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
        'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
        'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
        'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
      ],
      turn: 'w',
      castling: {
        k: true,
        q: true,
        K: true,
        Q: true,
      },
      ep: null,
      halfmove: 0,
      fullmove: 1,
    })
  })

  test('success, en passant', () => {
    type Result = ParseFen<'8/8/8/8/3P4/8/8/8 b - d3 0 1'>

    assertType<Result['ep'] extends PositionIndex['d3'] ? true : false>(true)
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

  test('fail, invalid en passant', () => {
    type IllegalCharacter = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR - KQkq x 0 1'> extends never ? true : false
    type IllegalPosition = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR - KQkq c5 0 1'> extends never ? true : false

    assertType<IllegalCharacter>(true)
    assertType<IllegalPosition>(true)
  })
})

describe('ParseSan<T>', () => {
  test('e2e4', () => {
    type Result = ParseSan<'e2e4'>

    assertType<Result>({
      from: 52,
      to: 36,
      promotion: '',
    })
  })

  test('a7a8Q', () => {
    type Result = ParseSan<'a7a8Q'>

    assertType<Result>({
      from: 8,
      to: 0,
      promotion: 'Q',
    })
  })

  test('whoops', () => {
    type Result = ParseSan<'whoops'> extends never ? true : false

    assertType<Result>(true)
  })
})
