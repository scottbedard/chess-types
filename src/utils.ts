import type { Index } from './base'

/**
 * Get the absolute value of a number
 */
export type Abs<T extends number> = `${T}` extends `-${string}`
  ? `${T}` extends `-${infer U}`
    ? `${U}` extends `${infer V extends number}`
      ? V
      : never
    : T
  : T

/**
 * Fill array to a certain size
 */
type Fill<
  T extends number,
  Arr extends number[] = []
> = Arr['length'] extends T ? Arr : Fill<T, [...Arr, 1]>

/**
 * Test if integer `A` is greater than `B`
 */
export type IsGreater<
  A extends number,
  B extends number,
> = [IsNegative<A>, IsNegative<B>] extends [infer NegA extends boolean, infer NegB extends boolean]
  // both values are negative
  ? [NegA, NegB] extends [true, true]
    ? [Abs<A>, Abs<B>] extends [infer AbsA extends number, infer AbsB extends number]
      ? IsGreater<AbsB, AbsA>
      : never
    // only the right side is negative
    : [NegA, NegB] extends [false, true]
      ? true
      // only the left side is negative
      : [NegA, NegB] extends [true, false]
        ? false
        // both values are positive
        : [NegA, NegB] extends [false, false]
          ? _Balance<A, B> extends [infer BalA extends number, number]
            ? BalA extends 0
              ? false
              : true
            : never
          : never
  : never

/** Test if string `T` includes string `U` */
export type Includes<T extends string, U extends string> =
  T extends `${string}${U}${string}`
    ? true
    : false

/** Increment number `T` */
export type Increment<T extends number, Acc extends 1[] = []> =
  Acc['length'] extends T
    ? [...Acc, 1]['length']
    : Increment<T, [...Acc, 1]>

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

/** Test for negative value */
export type IsNegative<T extends number> = `${T}` extends `-${string}` ? true : false

/** Test if a number is odd */
export type IsOdd<T extends number> = `${T}` extends `${string}${'1' | '3' | '5' | '7' | '9'}` ? true : false

/** Multiple a number by -1 */
export type Negate<T extends number> =
  `${T}` extends `-${infer V extends number}`
    ? V
    : ToNumber<`-${T}`>

/** Map a tuple of indices to san notation */
export type ToMoves<
  T extends Index[],
  From extends Index,
  Acc extends unknown[] = []
> = T extends [infer To extends Index, ...infer Tail extends Index[]]
  ? ToMoves<Tail, From, [...Acc, {
    castle: false,
    from: From,
    to: To,
    promotion: ''
  }]>
  : Acc

/** Cast string value to a number */
type ToNumber<T extends string> = T extends `${infer U extends number}` ? U : never

/**
 * Sum two numbers
 */
export type Sum<
  A extends number,
  B extends number,
> = [IsNegative<A>, IsNegative<B>] extends [infer NegA extends boolean, infer NegB extends boolean]
    // negative + negative
    ? [NegA, NegB] extends [true, true]
      ? Negate<_Sum<Abs<A>, Abs<B>>>
    // negative + positive
    : [NegA, NegB] extends [true, false]
      ? _Balance<A, B> extends [infer BalanceA extends number, infer BalanceB extends number]
        ? BalanceA extends 0
          ? BalanceB
          : Negate<BalanceA>
        : never
    // positive + negative
    : [NegA, NegB] extends [false, true]
      ? _Balance<A, B> extends [infer BalanceA extends number, infer BalanceB extends number]
        ? BalanceB extends 0 ? BalanceA : Negate<BalanceB>
        : never
    // positive + positive
    : _Sum<A, B>
  : never

export type _Sum<
  A extends number,
  B extends number,
> = [...Fill<A>, ...Fill<B>]['length'] extends infer U extends number ? U : never

/** Iterate A and B towards 0, stop when either of them reach it */
type _Balance<
  A extends number,
  B extends number,
  SetA extends 1[] = Fill<Abs<A>>,
  SetB extends 1[] = Fill<Abs<B>>,
> = SetA['length'] extends SetB['length']
  ? [0, 0]
  : SetA extends [1, ...infer TailA extends 1[]]
    ? SetB extends [1, ...infer TailB extends 1[]]
      ? _Balance<A, B, TailA, TailB>
      : [SetA['length'], 0] // Set B ran out first
    : [0, SetB['length']] // set A ran our first
