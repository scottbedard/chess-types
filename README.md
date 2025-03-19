# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)


Welcome to a strange TypeScript exercise, our goal is to play chess inside the type system.

[Play with the chessboard &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAb0gB9ACLcClADapyAcVTjEAGkiQAChgKIAMUQAO0gAX0gAM3QJSAByBBQMLDxCEiNCOM0OSGx0RFRSREhUSGDEAHdITldEcAzIFzdIAF4fP0CQgB449GD4AEcAa3hg9GBKSanJ4AAOOYX572WV5eAAJQA5ACEARQBpbc31yCr93aGByGJIAAZIAEY4gD5s4Gra+0dIG0gCUm4djsP1CfGKFT0QwInng-AMFUBwLs3CGiDs5EgdlEoiGmJRxT4NiE4ByYmCAOC-FQQIxqGQyG4wU4kAABptEAAPUgAWVEADdECzcvlCozmaUas0+QRDPhchJKIDEOgSRocg12VzeQLWj4HOQuk0PJAANpxRAAJkQABY4p4hA6ALqvVUMfnKwyiP6IYrwUTJeqqSAAYSUBD9yV1VhsX2ctUNtVeQA)

I don't recommend using these for anything, but if you must...

```sh
pnpm install @bedard/chess-types

yarn add @bedard/chess-types

npm install @bedard/chess-types
```

## Basic usage

Games can be parsed and stringified using Forsyth–Edwards Notation notation <sup>[more info &rarr;](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)</sup>

```ts
type Game = ParseFen<'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'>

/*
{
  board: [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
  ],
  turn: 'w',
  castling: {
    K: true,
    Q: true,
    k: true,
    q: true,
  },
  ep: null,
  halfmove: 0,
  fullmove: 1,
}
*/

type Fen = FormatGame<Game> // 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
```

More to come, see the playground above for my current process.

## License

[MIT](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Copyright (c) 2025-present, Scott Bedard
