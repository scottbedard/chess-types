import type { Castling, Piece } from './chess'
import type { IsLength } from './utils/string'

/** format board to fen notation */
export type FormatGame<T extends string> =
  IsLength<T, 64> extends false ? never : _FormatGame<T>

type _FormatGame<
  T extends string,
  Acc extends string = '',
  Count extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 0,
  Skip extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 0,
  Rank extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 0
> = Count extends 8
  ? _FormatGame<T, `${Acc}${Skip extends 0 ? '' : Skip}${Rank extends 7 ? '' : '/'}`, 0, 0, _Tick<Rank>>
  : Skip extends 8
    ? never
    : T extends `${infer Head}${infer Tail}`
      ? Head extends Piece
        ? _FormatGame<Tail, `${Acc}${Skip extends 0 ? '' : Skip}${Head}`, _Tick<Count>, 0, Rank>
        : _FormatGame<Tail, Acc, _Tick<Count>, _Tick<Skip>, Rank>
      : Acc

type _Tick<T extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8> =
  T extends 0 ? 1 :
  T extends 1 ? 2 :
  T extends 2 ? 3 :
  T extends 3 ? 4 :
  T extends 4 ? 5 :
  T extends 5 ? 6 :
  T extends 6 ? 7 : 8

/** stringify casting rights */
export type FormatCastling<
  T extends Castling,
  U = `${T['K'] extends true ? 'K' : ''}${T['Q'] extends true ? 'Q' : ''}${T['k'] extends true ? 'k' : ''}${T['q'] extends true ? 'q' : ''}`
> = U extends '' ? '-' : U
