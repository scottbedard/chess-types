# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)


Welcome to a strange TypeScript exercise, our goal is to play chess inside the type system.

[Play with the chessboard &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAwkoLxRGZABpzAeWzZ+lbigBC5J5EgABQwCRAAxRAA7cABfSAAzdAlIAHIEFHtFQhIjQhTNDkhsdERUUkRIVEhIxAB3SE5UcURwXMgAcSaKgF4gkPCogB4U9Ej4AEcAa3hI9GBKBcWF4AAOVfW1wK3treAAJQA5bwBFAGlvA73IetPjyfHIYkgABkgARhSAPgLgBsQDXQEXjcUSRAiQURuDxeZCQeDkSpFUQAGz0rVUkG8yNQ2EmkF6rncnh85GG8BSDg6XW+bQA6rheD1IIToSThrUKVTmt9wIVGs1KNiEdxwQRSNxkcjINxIoZ8Nc9JMCJT4PwDLUJVLkdxJohkQjUaI8drdXKRUJeb8xJFxZF+KhJQjUMhkDLOJAAAYHRAAD1IAFlRAA3RAeoolMpuxH8ipB8F8CpiHQSxDoS2WwwY71+wMh-FBIWDTrNSkAbRSiAATIgACycoQNgC6PMKuGDqcMokgoQqtns6OMVmyfcw+aHRBHyCL1PAQA)

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
