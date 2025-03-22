import { assertType, describe, test } from 'vitest'
import type { FormatGame, ParseFen } from '@/notation'
import type { Positions } from '@/base'

import type {
  ApplyMoveUnsafe,
  Chessboard,
  CurrentMoves,
  CurrentMovesUnsafe,
  FindKing,
  IsCheck,
  IsLegal,
  IsThreatened,
  OccupiedBy,
  Play,
} from '@/game'

describe('ApplyMoveUnsafe<Game, San>', () => {
  test('never if unoccupied', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type Result = ApplyMoveUnsafe<Game, 'a1a2'> extends never ? true : false

    assertType<Result>(true)
  })

  test('alternate color', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type WhiteMoved = ApplyMoveUnsafe<Game, 'e2e4'>

    assertType<WhiteMoved['turn']>('b')

    type BlackMoved = ApplyMoveUnsafe<WhiteMoved, 'e7e5'>

    assertType<BlackMoved['turn']>('w')
  })

  test('counts halfmove', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    assertType<Game['halfmove']>(0)

    type Move1 = ApplyMoveUnsafe<Game, 'b1c3'>

    assertType<Move1['halfmove']>(1)

    type Move2 = ApplyMoveUnsafe<Move1, 'e2e4'>

    assertType<Move2['halfmove']>(0)

    type Move3 = ApplyMoveUnsafe<Move2, 'e7e5'>

    assertType<Move3['halfmove']>(0)

    type Move4 = ApplyMoveUnsafe<Move3, 'g8f6'>

    assertType<Move4['halfmove']>(1)
  })

  test('moves piece and unoccupies from index', () => {
    type Game = ParseFen<'R7/8/8/8/8/8/8/8 w - - 0 1'>

    type Result = ApplyMoveUnsafe<Game, 'a8b8'>

    assertType<Result['board'][0]>(' ')

    assertType<Result['board'][1]>('R')
  })

  test('castle white short', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/4K2R w K - 0 1'>

    type Result = FormatGame<ApplyMoveUnsafe<Game, 'e1g1'>>

    assertType<Result>('8/8/8/8/8/8/8/5RK1 b - - 1 1')
  })

  test('white castle long', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/R3K3 w Q - 0 1'>

    type Result = FormatGame<ApplyMoveUnsafe<Game, 'e1c1'>>

    assertType<Result>('8/8/8/8/8/8/8/2KR4 b - - 1 1')
  })

  test('black castle short', () => {
    type Game = ParseFen<'4k2r/8/8/8/8/8/8/8 b k - 0 1'>

    type Result = FormatGame<ApplyMoveUnsafe<Game, 'e8g8'>>

    assertType<Result>('5rk1/8/8/8/8/8/8/8 w - - 1 2')
  })

  test('black castle long', () => {
    type Game = ParseFen<'r3k3/8/8/8/8/8/8/8 b q - 0 1'>

    type Result = FormatGame<ApplyMoveUnsafe<Game, 'e8c8'>>

    assertType<Result>('2kr4/8/8/8/8/8/8/8 w - - 1 2')
  })

  test('set en passant', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type A3 = Positions[ApplyMoveUnsafe<Game, 'a2a4'>['ep']]
    type B3 = Positions[ApplyMoveUnsafe<Game, 'b2b4'>['ep']]
    type C3 = Positions[ApplyMoveUnsafe<Game, 'c2c4'>['ep']]
    type D3 = Positions[ApplyMoveUnsafe<Game, 'd2d4'>['ep']]
    type E3 = Positions[ApplyMoveUnsafe<Game, 'e2e4'>['ep']]
    type F3 = Positions[ApplyMoveUnsafe<Game, 'f2f4'>['ep']]
    type G3 = Positions[ApplyMoveUnsafe<Game, 'g2g4'>['ep']]
    type H3 = Positions[ApplyMoveUnsafe<Game, 'h2h4'>['ep']]

    type A6 = Positions[ApplyMoveUnsafe<Game, 'a7a5'>['ep']]
    type B6 = Positions[ApplyMoveUnsafe<Game, 'b7b5'>['ep']]
    type C6 = Positions[ApplyMoveUnsafe<Game, 'c7c5'>['ep']]
    type D6 = Positions[ApplyMoveUnsafe<Game, 'd7d5'>['ep']]
    type E6 = Positions[ApplyMoveUnsafe<Game, 'e7e5'>['ep']]
    type F6 = Positions[ApplyMoveUnsafe<Game, 'f7f5'>['ep']]
    type G6 = Positions[ApplyMoveUnsafe<Game, 'g7g5'>['ep']]
    type H6 = Positions[ApplyMoveUnsafe<Game, 'h7h5'>['ep']]

    assertType<A3>('a3')
    assertType<B3>('b3')
    assertType<C3>('c3')
    assertType<D3>('d3')
    assertType<E3>('e3')
    assertType<F3>('f3')
    assertType<G3>('g3')
    assertType<H3>('h3')

    assertType<A6>('a6')
    assertType<B6>('b6')
    assertType<C6>('c6')
    assertType<D6>('d6')
    assertType<E6>('e6')
    assertType<F6>('f6')
    assertType<G6>('g6')
    assertType<H6>('h6')
  })

  test('clear en passant', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Move1 = ApplyMoveUnsafe<Game, 'e2e4'>

    assertType<Positions[Move1['ep']]>('e3')

    type Move2 = ApplyMoveUnsafe<Move1, 'b8c6'>

    assertType<Move2['ep']>(null)
  })

  test('capture en passant white', () => {
    type Game = ParseFen<'8/8/8/3pP3/8/8/8/8 w - d6 0 2'>

    type Result = FormatGame<ApplyMoveUnsafe<Game, 'e5d6'>>

    assertType<Result>('8/8/3P4/8/8/8/8/8 b - - 0 2')
  })

  test('capture en passant black', () => {
    type Game = ParseFen<'8/8/8/8/3Pp3/8/8/8 b - d3 0 1'>

    type Result = FormatGame<ApplyMoveUnsafe<Game, 'e4d3'>>

    assertType<Result>('8/8/8/8/8/3p4/8/8 w - - 0 2')
  })
})

describe('Chessboard', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type White = Chessboard<Game>

    type Black = Chessboard<Game, true>

    assertType<White>({
      8: ' - * - * - * - * ',
      7: ' * - * - * - * - ',
      6: ' - * - * - * - * ',
      5: ' * - * - * - * - ',
      4: ' - * - * - * - * ',
      3: ' * - * - * - * - ',
      2: ' - * - * - * - * ',
      1: ' * - * - * - * - ',
    })

    assertType<Black>({
      1: ' - * - * - * - * ',
      2: ' * - * - * - * - ',
      3: ' - * - * - * - * ',
      4: ' * - * - * - * - ',
      5: ' - * - * - * - * ',
      6: ' * - * - * - * - ',
      7: ' - * - * - * - * ',
      8: ' * - * - * - * - ',
    })
  })

  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type White = Chessboard<Game>

    type Black = Chessboard<Game, true>

    assertType<White>({
      8: ' r n b q k b n r ',
      7: ' p p p p p p p p ',
      6: ' - * - * - * - * ',
      5: ' * - * - * - * - ',
      4: ' - * - * - * - * ',
      3: ' * - * - * - * - ',
      2: ' P P P P P P P P ',
      1: ' R N B Q K B N R ',
    })

    assertType<Black>({
      1: ' R N B K Q B N R ',
      2: ' P P P P P P P P ',
      3: ' - * - * - * - * ',
      4: ' * - * - * - * - ',
      5: ' - * - * - * - * ',
      6: ' * - * - * - * - ',
      7: ' p p p p p p p p ',
      8: ' r n b k q b n r ',
    })
  })
})

describe('CurrentMoves<Game, Turn>', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type White = CurrentMoves<Game>
    type Black = CurrentMoves<Game, 'b'>

    assertType<White>([])
    assertType<Black>([])
  })

  test('starting position', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Result = CurrentMoves<Game>

    assertType<Result>([
      'a2a3', 'a2a4', 'b2b3', 'b2b4', 'c2c3', 'c2c4', 'd2d3', 'd2d4',
      'e2e3', 'e2e4', 'f2f3', 'f2f4', 'g2g3', 'g2g4', 'h2h3', 'h2h4',
      'b1a3', 'b1c3', 'g1f3', 'g1h3'
    ])
  })

  test('must block check', () => {
    type Game = ParseFen<'K6r/Q6r/8/8/8/8/8/8 w - - 0 1'>

    type Result = CurrentMoves<Game>

    assertType<Result>(['a7b8'])
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

describe('IsCheck<Game, KingColor>', () => {
  test('no check', () => {
    type Game = ParseFen<'8/8/8/8/8/8/4p3/4K3 w - - 0 1'>

    type Black = IsCheck<Game>
    type White = IsCheck<Game, 'w'>

    assertType<Black>(false)
    assertType<White>(false)
  })

  test('white checked on turn', () => {
    type Game = ParseFen<'r3k3/8/8/8/8/8/5p2/4K3 w - - 0 1'>

    type Result = IsCheck<Game>

    assertType<Result>(true)
  })

  test('black checked on turn', () => {
    type Game = ParseFen<'r3k3/8/8/1B6/8/8/8/4K3 b - - 0 1'>

    type Result = IsCheck<Game>

    assertType<Result>(true)
  })

  test('check by explicit color', () => {
    type Game = ParseFen<'r3k3/8/8/8/8/8/5p2/4K3 w - - 0 1'>

    type Black = IsCheck<Game, 'b'>
    type White = IsCheck<Game, 'w'>

    assertType<Black>(false)
    assertType<White>(true)
  })
})

describe('IsLegal<Game, San>', () => {
  test('false from empty positions', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type Result = IsLegal<Game, 'f5f6'>

    assertType<Result>(false)
  })

  test('true for legal moves', () => {
    type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

    type Result = IsLegal<Game, 'e2e4'>

    assertType<Result>(true)
  })

  test('cannot self-check by moving pinned piece', () => {
    type Game = ParseFen<'7b/8/8/8/3P4/8/8/K7 w - - 0 1'>

    type Result = IsLegal<Game, 'd4d5'>

    assertType<Result>(false)
  })

  test('cannot move king into check', () => {
    type Game = ParseFen<'8/8/3k4/8/4P3/8/8/8 b - - 0 1'>

    type Result = IsLegal<Game, 'd6d5'>

    assertType<Result>(false)
  })
})

describe('IsThreatened<Game, Color, Index>', () => {
  test('empty board', () => {
    type Game = ParseFen<'8/8/8/8/8/8/8/8 w KQkq - 0 1'>

    type Result = IsThreatened<Game, 'a1', 'w'>

    assertType<Result>(false)
  })

  test('black obstructed', () => {
    type Game = ParseFen<'8/8/8/3R4/8/4P3/8/2b5 w - - 0 1'>

    type ThreatenedByBlack = IsThreatened<Game, 'g5', 'b'>
    type ThreatenedByWhite = IsThreatened<Game, 'g5', 'w'>

    assertType<ThreatenedByBlack>(false)
    assertType<ThreatenedByWhite>(true)
  })

  test('white obstructed', () => {
    type Game = ParseFen<'8/8/8/3R1P2/8/8/8/2b5 w - - 0 1'>

    type ThreatenedByBlack = IsThreatened<Game, 'g5', 'b'>
    type ThreatenedByWhite = IsThreatened<Game, 'g5', 'w'>

    assertType<ThreatenedByBlack>(true)
    assertType<ThreatenedByWhite>(false)
  })

  test('unreachable position', () => {
    type Game = ParseFen<'8/8/8/3R1P2/8/8/8/2b5 w - - 0 1'>

    type ThreatenedByBlack = IsThreatened<Game, 'a8', 'b'>
    type ThreatenedByWhite = IsThreatened<Game, 'a8', 'w'>

    assertType<ThreatenedByBlack>(false)
    assertType<ThreatenedByWhite>(false)
  })

  test('threatened by pieces later in index', () => {
    type Game = ParseFen<'N7/4B3/8/8/8/8/8/2b5 w - - 0 1'>

    type ThreatenedByBlack = IsThreatened<Game, 'g5', 'b'>
    type ThreatenedByWhite = IsThreatened<Game, 'g5', 'w'>

    assertType<ThreatenedByBlack>(true)
    assertType<ThreatenedByWhite>(true)
  })
})

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

describe('Play<Game, Moves>', () => {
  test('Italian game', () => {
    type Result = Play<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', [
      'e2e4', 'e7e5',
      'g1f3', 'b8c6',
      'f1c4', 'f8c5',
    ]>

    type Fen = FormatGame<Result>

    assertType<Fen>('r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4')
  })
})
