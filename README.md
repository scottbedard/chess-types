# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Welcome to a strange experiment to play chess inside TypeScript's type system.

[Check out the sandbox &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/JYWwDg9gTgLgBDAnmApnA3gKDnAwgCxQGciAjCAQygBMAabOAMWhApgHEKQV6cA5FAHdO3XnAEAPGAFkIANx6YAvnABmUCCDgByAAKkU1KtQD0AY0IkAtElRFtmTLbQi0AXnFDXAHgDaDbRQAJhQAFm1aHRQAdhQAVgiAgHMARlUAZgidUgAOMwA2RJxtVRSzcMiSvISxbQB5KzqsuBMTOAA6TswAXQA+R2c8MABXWQU4D0kZeRRvV16Wtu8rODAAGwpEOAokimAAOyJ4GEI4M00wYDWUKABCAeQ0ACFKGgm8SzJX6jmuFAXWnBlnB8DMoAgIHAiCg0Cc0GZhlAoCh9vByMYoTA2ChHICsICcDgcgAuOAAIjg4IAVHBSHAAI5wADWcBp+0p5IA3JgCYToqSKWBVsKhTSheKuTy2oS4PkBXAVmzWQrlYrJbycHF5TSVnSVkK1SsydyNXBQvK1U9lQAFVXK41SmVwdLalU65V8O0O01BeW2-1wW0rAO273SwkpeUAJXEcCtAEVlTGANIqsNwJS4tqqA4UNZrRCRFASSCwBCnXbcbZEbaYqAHJJwYZEBtMACinv2ECxMGAEH2D1QTBR72YUFYHD+v24ALa2igKVI9KZKX2UBMYE3YBSW5MQX2cT3pB36T3TxS1tPcT4QRM1vv1ov95MUb4T3jKSjyZStOZjJWcRmg4QA)

## Basic usage

Create a game and apply moves using `{from}{to}{promotion?}` strings. Castling is done via `O-O` and `O-O-O` syntax, lowercase for black.

```ts
import type {
  Chessboard,
  FormatGame,
  NewGame,
  NextMove,
} from '@bedard/chess-types'

type Game = NewGame<[
  'e2e4', 'e7e5',
  'g1f3', 'b8c6',
  'f1c4', 'f8c5',
  'O-O',  // ...
]>

type CpuMove = NextMove<Game> // <- play against the compiler!

type Board = Chessboard<Game> // <- hover to see the current board state

// {
//     8: " r * b q k * n r ";
//     7: " p p p p * p p p ";
//     6: " - * n * - * - * ";
//     5: " * - b - p - * - ";
//     4: " - * B * P * - * ";
//     3: " * - * - * N * - ";
//     2: " P P P P - P P P ";
//     1: " R N B Q * R K - ";
// }

// finally, export the game as a string using FEN notation

type Fen = FormatGame<Game> // 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4'
```

There are loads of other interesting types under the hood, like [`IsLegal`](https://github.com/scottbedard/chess-types/blob/a341df357eae5b2f7f293ddaf4335778ee357258/src/game.ts#L350-L421), [`ParseFen`](https://github.com/scottbedard/chess-types/blob/a341df357eae5b2f7f293ddaf4335778ee357258/src/notation.ts#L121-L137), and [`Evaluate`](https://github.com/scottbedard/chess-types/blob/a341df357eae5b2f7f293ddaf4335778ee357258/src/evaluate.ts#L75-L83). So if you're into that kind of thing, by all means dig around and let me know what you think!

Side note, `NextMove` uses an extremely naive strategy. It simply adds up all the pieces and chooses the move with the best score. There are many improvements that could be made, but that was never the plan here. My goal was to play chess inside the compiler, not to build stockfish.

## Final thoughts

TypeScript is amazing.

It's type system can be thought of as it's own purely functional language, but for obvious reasons it shouldn't be used as one. There was no practical reason for any of this beyond learning, but in that sense I've enjoyed it and feel like I've succeeded. More specifically, I've gained a new appreciation for the recursive accumulator pattern, and generic type inference.

If you find this repo interesting, here are some others you may like!

- [`Type<Challenge[]>`](https://github.com/type-challenges/type-challenges)
- [`typescript-types-only-wasm-runtime`](https://github.com/MichiganTypeScript/typescript-types-only-wasm-runtime)
- [`RuyiLi/cursed-typescript`](https://github.com/RuyiLi/cursed-typescript)
- [`susisu/typefuck`](https://github.com/susisu/typefuck)

## License

[MIT](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Copyright (c) 2025-present, Scott Bedard
