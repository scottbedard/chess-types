import type { Color, FriendlyPiece, ParsedGame } from './chess'
/* eslint-disable @stylistic/no-multi-spaces */

/** Graph indices */
type GraphIndex =
  |  0 |  1 |  2 |  3 |  4 |  5 |  6 |  7
  |  8 |  9 | 10 | 11 | 12 | 13 | 14 | 15
  | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
  | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
  | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39
  | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47
  | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55
  | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63

/** Map position indices to their positions */
export type MapPositions<
  T extends GraphIndex[],
  Acc extends Positions[GraphIndex][] = []
> = T extends [infer U extends GraphIndex, ...infer V extends GraphIndex[]]
  ? MapPositions<V, [...Acc, Positions[U]]>
  : Acc

/** Tuple of positions by FEN index */
type Positions = [
  'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
  'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
  'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
  'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
  'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
  'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
  'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
  'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
]

/** String union of position names */
export type Position<T extends GraphIndex> = Positions[T]

/** Position indices within the graph */
export type Index = {
  a8: 0, b8: 1, c8: 2, d8: 3, e8: 4, f8: 5, g8: 6, h8: 7,
  a7: 8, b7: 9, c7: 10, d7: 11, e7: 12, f7: 13, g7: 14, h7: 15,
  a6: 16, b6: 17, c6: 18, d6: 19, e6: 20, f6: 21, g6: 22, h6: 23,
  a5: 24, b5: 25, c5: 26, d5: 27, e5: 28, f5: 29, g5: 30, h5: 31,
  a4: 32, b4: 33, c4: 34, d4: 35, e4: 36, f4: 37, g4: 38, h4: 39,
  a3: 40, b3: 41, c3: 42, d3: 43, e3: 44, f3: 45, g3: 46, h3: 47,
  a2: 48, b2: 49, c2: 50, d2: 51, e2: 52, f2: 53, g2: 54, h2: 55,
  a1: 56, b1: 57, c1: 58, d1: 59, e1: 60, f1: 61, g1: 62, h1: 63,
}

/**
 * This type represents positions and their relation to one another.
 *
 * Imagine positions at the center of a 3x3 grid, with neighboring values
 * containing the index of adjacent positions. -1 indicates that the position
 * is off the board.
 */
type Graph = [
  [-1, -1, -1, -1,  0,  1, -1,  8,  9],
  [-1, -1, -1,  0,  1,  2,  8,  9, 10],
  [-1, -1, -1,  1,  2,  3,  9, 10, 11],
  [-1, -1, -1,  2,  3,  4, 10, 11, 12],
  [-1, -1, -1,  3,  4,  5, 11, 12, 13],
  [-1, -1, -1,  4,  5,  6, 12, 13, 14],
  [-1, -1, -1,  5,  6,  7, 13, 14, 15],
  [-1, -1, -1,  6,  7, -1, 14, 15, -1],
  [-1,  0,  1, -1,  8,  9, -1, 16, 17],
  [ 0,  1,  2,  8,  9, 10, 16, 17, 18],
  [ 1,  2,  3,  9, 10, 11, 17, 18, 19],
  [ 2,  3,  4, 10, 11, 12, 18, 19, 20],
  [ 3,  4,  5, 11, 12, 13, 19, 20, 21],
  [ 4,  5,  6, 12, 13, 14, 20, 21, 22],
  [ 5,  6,  7, 13, 14, 15, 21, 22, 23],
  [ 6,  7, -1, 14, 15, -1, 22, 23, -1],
  [-1,  8,  9, -1, 16, 17, -1, 24, 25],
  [ 8,  9, 10, 16, 17, 18, 24, 25, 26],
  [ 9, 10, 11, 17, 18, 19, 25, 26, 27],
  [10, 11, 12, 18, 19, 20, 26, 27, 28],
  [11, 12, 13, 19, 20, 21, 27, 28, 29],
  [12, 13, 14, 20, 21, 22, 28, 29, 30],
  [13, 14, 15, 21, 22, 23, 29, 30, 31],
  [14, 15, -1, 22, 23, -1, 30, 31, -1],
  [-1, 16, 17, -1, 24, 25, -1, 32, 33],
  [16, 17, 18, 24, 25, 26, 32, 33, 34],
  [17, 18, 19, 25, 26, 27, 33, 34, 35],
  [18, 19, 20, 26, 27, 28, 34, 35, 36],
  [19, 20, 21, 27, 28, 29, 35, 36, 37],
  [20, 21, 22, 28, 29, 30, 36, 37, 38],
  [21, 22, 23, 29, 30, 31, 37, 38, 39],
  [22, 23, -1, 30, 31, -1, 38, 39, -1],
  [-1, 24, 25, -1, 32, 33, -1, 40, 41],
  [24, 25, 26, 32, 33, 34, 40, 41, 42],
  [25, 26, 27, 33, 34, 35, 41, 42, 43],
  [26, 27, 28, 34, 35, 36, 42, 43, 44],
  [27, 28, 29, 35, 36, 37, 43, 44, 45],
  [28, 29, 30, 36, 37, 38, 44, 45, 46],
  [29, 30, 31, 37, 38, 39, 45, 46, 47],
  [30, 31, -1, 38, 39, -1, 46, 47, -1],
  [-1, 32, 33, -1, 40, 41, -1, 48, 49],
  [32, 33, 34, 40, 41, 42, 48, 49, 50],
  [33, 34, 35, 41, 42, 43, 49, 50, 51],
  [34, 35, 36, 42, 43, 44, 50, 51, 52],
  [35, 36, 37, 43, 44, 45, 51, 52, 53],
  [36, 37, 38, 44, 45, 46, 52, 53, 54],
  [37, 38, 39, 45, 46, 47, 53, 54, 55],
  [38, 39, -1, 46, 47, -1, 54, 55, -1],
  [-1, 40, 41, -1, 48, 49, -1, 56, 57],
  [40, 41, 42, 48, 49, 50, 56, 57, 58],
  [41, 42, 43, 49, 50, 51, 57, 58, 59],
  [42, 43, 44, 50, 51, 52, 58, 59, 60],
  [43, 44, 45, 51, 52, 53, 59, 60, 61],
  [44, 45, 46, 52, 53, 54, 60, 61, 62],
  [45, 46, 47, 53, 54, 55, 61, 62, 63],
  [46, 47, -1, 54, 55, -1, 62, 63, -1],
  [-1, 48, 49, -1, 56, 57, -1, -1, -1],
  [48, 49, 50, 56, 57, 58, -1, -1, -1],
  [49, 50, 51, 57, 58, 59, -1, -1, -1],
  [50, 51, 52, 58, 59, 60, -1, -1, -1],
  [51, 52, 53, 59, 60, 61, -1, -1, -1],
  [52, 53, 54, 60, 61, 62, -1, -1, -1],
  [53, 54, 55, 61, 62, 63, -1, -1, -1],
  [54, 55, -1, 62, 63, -1, -1, -1, -1],
]

/** Step along the graph in a given direction */
export type Step<
  From extends Positions[GraphIndex],
  Direction extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  U = Graph[Index[From]][Direction]
> = U extends GraphIndex ? Positions[U] : never

export type _Step<
  From extends GraphIndex,
  Direction extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
  U = Graph[From][Direction]
> = U extends GraphIndex ? U : never

/** Walk along the graph, stopping short of friendly pieces */
export type Walk<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends Positions[GraphIndex],
  Direction extends 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8, // <- cannot walk to center index
  Path = _Walk<Game, Friendly, Index[From], Direction>
> = Path extends GraphIndex[] ? MapPositions<Path> : never

export type _Walk<
  Game extends ParsedGame,
  Friendly extends Color,
  From extends GraphIndex,
  Direction extends 0 | 1 | 2 | 3 | 5 | 6 | 7 | 8, // <- cannot walk to center index
  Acc extends GraphIndex[] = [],
  To extends GraphIndex = _Step<From, Direction>
> = Game['board'][To] extends '_'
  ? _Walk<Game, Friendly, To, Direction, [...Acc, To]>
  : Game['board'][To] extends FriendlyPiece<Friendly>
    ? Acc
    : [...Acc, To] // @todo, handle end o board
