import type { Piece } from './chess'
import type { IsLength } from './utils/string'

/** format board to fen notation */
export type FormatBoard<T extends string> =
  IsLength<T, 64> extends false ? never : _FormatBoard<T>

type _FormatBoard<
  T extends string,
  Acc extends string = '',
  Count extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 0,
  Skip extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 0,
  Rank extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 0
> = Count extends 8
  ? _FormatBoard<T, `${Acc}${Skip extends 0 ? '' : Skip}${Rank extends 7 ? '' : '/'}`, 0, 0, _Tick<Rank>>
  : Skip extends 8
    ? never
    : T extends `${infer Head}${infer Tail}`
      ? Head extends Piece
        ? _FormatBoard<Tail, `${Acc}${Skip extends 0 ? '' : Skip}${Head}`, _Tick<Count>, 0, Rank>
        : _FormatBoard<Tail, Acc, _Tick<Count>, _Tick<Skip>, Rank>
      : Acc

type _Tick<T extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8> =
  T extends 0 ? 1 :
  T extends 1 ? 2 :
  T extends 2 ? 3 :
  T extends 3 ? 4 :
  T extends 4 ? 5 :
  T extends 5 ? 6 :
  T extends 6 ? 7 : 8
