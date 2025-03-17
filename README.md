# `@bedard/type-chess`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)

A pointless exercise to implement a playable chess engine within the Typescript type system.

Check back later, much later.

### Current progress...

✅ Fen parsing and formatting games

```ts
type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

// {
//   board: [
//     'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
//     'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
//     '_', '_', '_', '_', '_', '_', '_', '_',
//     '_', '_', '_', '_', '_', '_', '_', '_',
//     '_', '_', '_', '_', '_', '_', '_', '_',
//     '_', '_', '_', '_', '_', '_', '_', '_',
//     'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
//     'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
//   ],
//   turn: 'w',
//   castling: {
//     K: true,
//     Q: true,
//     k: true,
//     q: true,
//   },
//   ep: '-',
//   halfmove: 0,
//   fullmove: 1,
// }

type Fen = FormatGame<Game>

// 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
```

✅ Walking along the board in a given direction, capturing enemy pieces and stopping short of friendly ones

```ts
type Game = ParseFen<'7Q/8/8/8/8/8/8/8 w - - 0 1'>

type Path = Walk<Game, 'b', 'a1', 2> // ['b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8']
```
