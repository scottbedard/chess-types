# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Welcome to a strange TypeScript experiment, my goal is to play chess inside the type system.

[Check out the sandbox &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAgpUoAbcgFlRAN0QBVAHYFUAM0QAacwBhJQJ4UQxkAMhIQP50dER3UkcXAg8vXyjIAEkCYMRsAGss3IAVXATUUkSULIAFDAJEADFErIB5bGx+Sm4UACFyLObud2QAaVHOYb1xKoBxVHF-cABfSG90CUgAcgQUCMVCEiNCHc0OSGxK6shUSHdEAHdITiXEcFPIReXIAF5IA10E1Wu4ADw7dDueAAR0K8Hc6GA1hRKOAAA4MVjMXVcXjccAAEoAOX6AEVxv1iYTIC9xmTCjDIMRIAAGSAARh2AD4LsBXogDLoCLxuKJPJBRF0en1kJB4OQ7ldRDY9J9VJB+jZUEV-pBOt1egNyGCfv5dvAeerjAB1XC8RB6g0y42m95+XZPK3gS6cQV3Gw2K5xBJJSDiZyED2IFzuSWPAiGXBVcOoRUJAj8GwGUaQJo2bzEPAFQrWx0pQjpHyOgGxeKJZKRtKeatu5a8n387yjOX3QpTeWKsSq9BlzXaoqTdycPUjMZTzht807S0dy7VAg57yvd6QbiJ3PFooevSQYWi8V7xN8G41ZBj-K6gG5R+FJe8r4AUQALGUKogqjvQY7QdPU-1vR5kCXD0dkQb8dhgr0135N5llsNMrzzUhuEDPc4z4R0nj0QoCA9eB+BzAwnhwoMbG4QpEDsSBVVEQpmPox0+H3IQeM7TtDA1OtQ1IM09TqbUTTND0AG1YIAJjghDIB4oQAF1eXXDViUQAAPRsXD1T8nFQGx+EAsEhIbM0NI0S5UDGZUklGMzA0VVBkGQAcAANtL0isvMMURIC8yykjNALSCC9C3LeUZNyTR0xB0HDEFHfjvFPdxRBefAEjuPKCAkR14FQEVsHDSNIF0pZbCjCqDOQKVryCpLEBUsdPzkn89SsWwHEjKtfGg3ZEAU+CPw1T8AHZPwAVh66w7ArQbEDBTqfxgxApsQWarS+eYOWaABmBa+uWlshumuaYM4DlvCOvaNX6dFAgANlOpaBou1aDuOmD4HRbBXse4xmg5QJvw+-qXBWsFnremDvA5bBxr5SAnD6F4CPlcJMEgfgRWnYL8iIMIIjBFTuS8sdslIEzuHs0TaxCMnMDBMGIeQ9HMY2LZxHlCdCh2RNqGBahsGwgzqL4JVvG1GdIo2OjKASnGIhpum6MZ95mmV6g5WZ45Wagjnvw9Uh0H4RAue7dwTLsD1N3QKZuG8RVsdQ4qdTYxX7l8dwx1BWdZgWd52fB78OyAA)

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
