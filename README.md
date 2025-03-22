# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Welcome to a strange TypeScript experiment, my goal is to play chess inside the type system.

[Check out the sandbox &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAgpUoAbcgFlRAN0QBVAHYFUAM0QAacwBhJQJ4UQxkAMhIQP50dER3UkcXAg8vXyjIADFud2QAaTzOLOy9cVRSAHFUcX9zAEkCYMRsAGsspoAVXATKxJQsgDlEAHcauqyABQwCRGzE6ZtUcgCAX0hvdAlIAHIEFAjFQhIjQl3NM8gJxEgAXkgR8drEAB4AbXNdxAAmRAAWXZ+PaIADsiAArECvpwAIzeADMQL28AAHNgAGzQ6K7byw7CA4G49FQgIAXQAfJdVJAAELhTD3GIhMIRV43KngDimLnAaL81GsSAAIkg6GgkHgkAAjpA2hL3GKRQBuXn86KgoWiyiQHV6iX6nXC1Xc9UYrWQYgKiVWmC2lVq9UQi12yWW3Xu13Gx38-4W+20iVTG0S72m-kIl2e6NDENhvnqn4W4MpyDBq2p4Px9WQWEWgBKjzpkAAipACtHC9m1tTjAtFQ8yugKtUXuyXpzubt0LD4NK2rD3OhgNZrLDR8Afu4IZP4OOEZPabCpguIUMfsAplupsut8B80NaSWCj9C6NyyW2rKrf9IIDwEA)

## Basic usage

To get started, create a game and apply moves to it using a list of `{from}{to}` strings.

```ts
type Game = NewGame<[
  'e2e4', 'e7e5',
  'g1f3', 'b8c6',
  'f1c4', 'f8c5',
]>

type Board = Chessboard<Game>

// {
//     8: " r * b q k * n r ";
//     7: " p p p p * p p p ";
//     6: " - * n * - * - * ";
//     5: " * - b - p - * - ";
//     4: " - * B * P * - * ";
//     3: " * - * - * N * - ";
//     2: " P P P P - P P P ";
//     1: " R N B Q K - * R ";
// }

type Fen = FormatGame<Game>

// 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4'
```

There are many of other types available under the hood, more docs to come.

## License

[MIT](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Copyright (c) 2025-present, Scott Bedard
