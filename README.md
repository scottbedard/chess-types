# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Welcome to a strange TypeScript experiment, my goal is to play chess inside the type system.

[Check out the sandbox &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAwkoLxRGZABpzF-unSIAdqQCyogG6EAKoeBKgAZohOkJAAkgRWiNgA1lGxBAAquO6opJ4oqQAKGASIAGKeqQDy2Nj8lNwoAELkqaXcHsgA0u2crXriOQDiqOKR4AC+kGHoEpAA5Ago9oqEJEaEc5ockNjZuZCokB6IAO6QnCOI4OuQw6OQALyQRegl5R4APHPoHvAAjkl4B50MBKGDwWDgAAOaGwmEFBGIhHAABKADlGgBFTqNNEoyBnTqYpJ-SDESAABkgAEY5gA+LbAc6IAy6Ai8biiEKQUQ1OoNZCQeDkA47UQAGz011UkEa4tQyUekGqtXqTXIX3gcwct0uDJuAHVcLxEEqVfz1V8TtrdaMGeBtpwWQdxeKdq53F5IOJ-IQdYgAh4eccCIZcDlvagRe4CPxxQZ2pASuKwsQ8IkktLjL4AgRgqEIkqXG5PD5fXmQuFEB87oh7dswu1BYckj0hSKxJL0FnTXKFUluh5OEq2h1B5wa5cdXMtfWmbkCAmwudLpBuKHE+nkjq9JA2RyuWvQ3w9nlkD3LPhFU84glkpO7ReAKIAFjimVPx2QzSNJqV76yRAcjPB9InmRAXxtOZrTnFdRkoeURXXJNSG4V01yDPhTROPQkgIHV4H4AwTjQt1xW4JJEHFEVJVEJJIHIyiw3XIQHSZMQvHafhUFdEVUGQZA2wAAzRRAAA8ywCISdj2NtDgue4-GPfAxR0NDEG7Dg2MMGVRIknNTSeApENAnUAG05kQAAmCCbSEeyAF1YMXdAem4MIRQU01SFEKZPAvd4R36IZLlA2DcF9dBDF8kpTVsewL0qIjKCIotrHizAwvAIA)

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
