# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)


Welcome to a strange TypeScript exercise, our goal is to play chess inside the type system.

[Click here to start exploring &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAwkoLxRGZABpzF-unSIAdqQCyogG6EAKoeBKgAZohOkJAAChgEiABinlGQAPLY2PyU3CgAQuSpiXriqKQA4qjikeAAvpBh6BKQAOQIKPaKhCRGhC2aHJDY7mWIkKiQHogA7pCcVYjgvZCV1ZAAvLHxSZ4APC3oHvAAjgDW8B7owJQ3tzfAAByPz08xb+9vwABKAHJ5AIoAaTyPy+kFmgP+p2OkGIkAADJAAIwtAB8A2Ac0QBl0BF43FEIUgoky2VyyEg8HI4yGogANnolqpIHk6ahsKcNulSTl8uR9vAWg4Vgt0csAOq4XhjTYZLK85AFfbTIUi6ro8CDTjY8Z0ulDVzuLyQcT+QjCxABDzEqYEQy4Mom1DU9wEfh0gzca0JOlhYh4RAcpnGXwBAjBUIRLkuNyeHxm8MhcKIXarRAarULShs6ncO0EUjcPWQL32sbTPSnAjC+D8AzTIv6uncU6IOnUhmiTnN1v2vNCTWYsReL38VB66moZDIL2cSAAAx+iAAHvGAvOhiNCx45xN5ms-Ha+GMxDoi4h0IPB4ZmUvV6GZbEc6mFsKANotRAAJkQABZVUIgEALoZpiBboLO3BhNS+5jKQogNJ4wZjMk1qbMU6ClBUCwvuqGIMGa6CGAhCRjLY9jIekdaUHW0bWORmC4em4BAA)

I don't recommend using these for anything, but if you must...

```sh
# pnpm
pnpm install @bedard/chess-types

# yarn
yarn add @bedard/chess-types

# npm
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
