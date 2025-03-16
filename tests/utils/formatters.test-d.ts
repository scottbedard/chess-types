import { assertType, describe, test } from 'vitest'
import type { FormatGame, FormatCastling } from '@/formatters'

describe('FormatGame<T>', () => {
  test('initial position', () => {
    type Result = FormatGame<'rnbqkbnrpppppppp________________________________PPPPPPPPRNBQKBNR'>

    assertType<Result>('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  })

  test('empty board', () => {
    type Result = FormatGame<'________________________________________________________________'>

    assertType<Result>('8/8/8/8/8/8/8/8')
  })

  test('partially empty ranks', () => {
    type Result = FormatGame<'p_______pp______ppp_____pppp____ppppp___pppppp__ppppppp_pppppppp'>

    assertType<Result>('p7/pp6/ppp5/pppp4/ppppp3/pppppp2/ppppppp1/pppppppp')
  })

  test('error', () => {
    type Result = FormatGame<'whoops'> extends never ? true : false

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
