# `@bedard/type-chess`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)

A pointless exercise to implement a playable game of chess engine within the Typescript type system.

Check back later, much later.

### Current progress

✅ Fen parsing

```ts
type Board = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

// {
//   board: 'rnbqkbnrpppppppp________________________________PPPPPPPPRNBQKBNR',
//   turnColor: 'w',
//   castlingRights: {
//     blackKing: true,
//     blackQueen: true,
//     whiteKing: true,
//     whiteQueen: true,
//   },
//   enPassant: '-',
//   halfmove: 0,
//   fullmove: 1,
// }
```
