import type {
  Index,
  Positions,
} from './base'

/** Test if string `T` includes string `U` */
export type Includes<T extends string, U extends string> =
  T extends `${string}${U}${string}`
    ? true
    : false

/** Convert positive string integer `T` to `number` */
export type Int<T extends string> =
  `${T}` extends `-${string}` | `${string}.${string}`
  ? never
  : T extends `${infer U extends number}`
    ? U
    : never

/** Test if string `T` is of length `U` */
export type IsLength<
  T extends string,
  U extends number,
  Acc extends unknown[] = []
> = T extends `${infer _}${infer Rest}`
  ? Acc['length'] extends U
    ? false
    : IsLength<Rest, U, [unknown, ...Acc]>
  : Acc['length'] extends U
    ? true
    : false

/** Test if a number is odd */
export type IsOdd<T extends number> = `${T}` extends `${string}${'1' | '3' | '5' | '7' | '9'}` ? true : false

/** Map a tuple of indices to san notation */
export type ToMoves<
  T extends Index[],
  From extends Index,
  Acc extends unknown[] = []
> = T extends [infer To extends Index, ...infer Tail extends Index[]]
  ? ToMoves<Tail, From, [...Acc, { from: From, to: To, promotion: '' }]>
  : Acc

/** Map indices to their named position */
export type ToPositions<
  T extends Index[],
  Acc extends Positions[Index][] = []
> = T extends [infer U extends Index, ...infer V extends Index[]]
  ? ToPositions<V, [...Acc, Positions[U]]>
  : Acc
