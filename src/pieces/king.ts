import type {
  Color,
  DirectionIndex,
  FriendlyPiece,
  Graph,
  Index,
  ParsedGame,
  Unoccupied,
} from '@/base'

import type { ToMoves } from '@/utils'

export type KingMoves<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
> = ToMoves<[
  ..._KingStep<Game, Friendly, From, 0>,
  ..._KingStep<Game, Friendly, From, 1>,
  ..._KingStep<Game, Friendly, From, 2>,
  ..._KingStep<Game, Friendly, From, 3>,
  ..._KingStep<Game, Friendly, From, 5>,
  ..._KingStep<Game, Friendly, From, 6>,
  ..._KingStep<Game, Friendly, From, 7>,
  ..._KingStep<Game, Friendly, From, 8>,
  ..._KingCastle<Game, Friendly, From, 3>,
  ..._KingCastle<Game, Friendly, From, 5>,
], From>

/** Normal king movement */
export type _KingStep<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends DirectionIndex,
> = Graph[From][Direction] extends infer To extends Index
  ? Game['board'][To] extends FriendlyPiece<Friendly>
    ? []
    : [To]
  : []

/** Castling moves */
type _KingCastle<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Index,
  Direction extends 3 | 5,
> = From extends _KingCastleFrom<Friendly>
  ? _HasCastlingRights<Game, Friendly, Direction> extends true
    ? Direction extends 5
      ? Graph[From][5] extends infer Short1 extends Index
        ? Game['board'][Short1] extends Unoccupied
          ? Graph[Short1][5] extends infer Short2 extends Index
            ? Game['board'][Short2] extends Unoccupied
              ? Graph[Short2][5] extends infer RookPosition extends Index
                ? Game['board'][RookPosition] extends _FriendlyRook<Friendly>
                  ? [Short2]
                  : []
                : []
              : []
            : []
          : []
        : []
      : Graph[From][3] extends infer Long1 extends Index
        ? Game['board'][Long1] extends Unoccupied
          ? Graph[Long1][3] extends infer Long2 extends Index
            ? Game['board'][Long2] extends Unoccupied
              ? Graph[Long2][3] extends infer Long3 extends Index
                ? Game['board'][Long3] extends Unoccupied
                  ? Graph[Long3][3] extends infer RookPosition extends Index
                    ? Game['board'][RookPosition] extends _FriendlyRook<Friendly>
                      ? [Long2]
                      : []
                    : []
                  : []
                : []
              : []
            : []
          : []
        : []
    : []
  : []

type _KingCastleFrom<T extends Color> = T extends 'w' ? 60 : 4

type _HasCastlingRights<
  Game extends ParsedGame,
  Friendly extends Color,
  Direction extends 3 | 5,
> = Friendly extends 'w'
  ? Direction extends 3 ? Game['castling']['Q'] : Game['castling']['K']
  : Direction extends 3 ? Game['castling']['q'] : Game['castling']['k']

type _FriendlyRook<T extends Color> = T extends 'w' ? 'R' : 'r'
