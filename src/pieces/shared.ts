import { Index } from '@/board'

/** Map a tuple of indices to san notation */
export type ToMoves<
  T extends Index[],
  From extends Index,
  Acc extends unknown[] = []
> = T extends [infer To extends Index, ...infer Tail extends Index[]]
  ? ToMoves<Tail, From, [...Acc, { from: From, to: To, promotion: null }]>
  : Acc
