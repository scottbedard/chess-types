# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Welcome to a strange TypeScript experiment, my goal is to play chess inside the type system.

#### [Check out the sandbox &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAwkoLxRGZABpzF-unSIAdqQCyogG6EAKoeBKgAZohOkJAAChgEiABinlGQAPLY2PyU3CgAQuSpidweyADSJZxFeuKopADiqOKR4AC+kGHoEpAA5Ago9oqEJEaEPZockNjudYiQqJAeiADukJxNiOCjkI3NkAC8sfFJngA8Pege8ACOANbwHujAlC+vL8AAHJ-fXzF--39gAAlAByeQAimU8iCgZBVmVwbdrpBiJAAAyQACMPQAfBNgGtEAZdAReNxRCFIKJMtlcshIPByPMpqIADZ6LaqSB5VmobC3A7pGk5fLkc7wHoOHYbPHbADquF4c0OGSyIuQBXOy0l0uaePAk04RPmrNZU1c7i8kHE-kIUsQAQ8VKWBEMuDq1tQTPcBH4rIMJUgCVZYWIeEQ-M5xl8AQIwVCEUFLjcnh8trjIXCiFOu0Q+smxVKzNulQZTLE7PQUbmPL5twqHk4gsL5UqOY2Up6EvzBPWzUovKZ3FdBFI3FNkEDfDmyz0twIUvg-AMy3HZtZ3FuiFZTPZogFG63buHQgNBLEXhK-FQpqZqGQyFLAAMQYgAB5pgJPqYzMeN5l9nMfiutOLI6OOiBVhwZ6GFyr4fjGyqxIO7bNFKADaPSIAATIgAAsOpCERAC6PZBqQ6CVNwYRMoBhiiB0njVpAyROociQ1HUuaoXm+IMLa6D0UGiBzLY9jMWky6UMuSbWGJmA8XiQA)

## Basic usage

Games can be parsed and stringified using Forsyth–Edwards Notation notation.

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

More info to come, check back later.

## License

[MIT](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Copyright (c) 2025-present, Scott Bedard
