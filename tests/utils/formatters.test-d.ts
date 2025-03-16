import { assertType, describe, test } from 'vitest'
import type { FormatBoard } from '@/formatters'

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
