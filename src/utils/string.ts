/** Test if string `T` includes string `U` */
export type Includes<T extends string, U extends string> =
  T extends `${string}${U}${string}`
    ? true
    : false

/** Explode string into tuple */
export type Explode<
  T extends string,
  Acc extends string[] = []
> = T extends `${infer Head}${infer Rest}`
  ? Explode<Rest, [...Acc, Head]>
  : Acc

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
