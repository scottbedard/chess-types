# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)


Welcome to a strange TypeScript exercise, our goal is to play chess inside the type system.

[See my current progress here &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/JYWwDg9gTgLgBDAnmApnA3gKDjuB9AEWAGcwAbAQ0QHEKQUAabXABQqmJQDEUA7TAL5wAZlAgg4AcgACAIxQATdgoD0AYwAWKYsQC0SVMUmZMKlXDVQUFGGl4oA7nADmdNA+AwNcCiL6YDNFp6OABeODYObj4AHkkoXlkARwBrWV4oFTBsnOyVAA4CosKWUrLSlQAlADkAIQBFAGla6sq4J0b6lKS4XTgABjgARkkAPhMzFzdyKh8wYDgSOGIYYDIyRd4ELXboFOIGOFkAV3hPODAxWQpZMkR2tY2yCAgU5fEUL2BeZzgyYBSaC+B1M5g8Xm2aGOnCgFggvFWvGOFHW9woCgU31+AANqigAB4wACyEAAbihsQgIJDNmBTiJoDS1OI6bYoJJiHAQGSUAA6UEIZBoPGEknksIRSiIGLBRhwADakhQACYUAAWSSHXnagC64wFFF4CjgGh5sOBgtQVOWKCBO1kEGUASFcAAwlodA7lBLCCQZjQ3DK3KMgA)

## Basic usage

Games can be parsed and stringified using [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) notation.

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
