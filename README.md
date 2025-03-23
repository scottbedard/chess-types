# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Welcome to a strange TypeScript experiment, my goal is to play chess inside the type system.

[Check out the sandbox &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAwkoLxRGZABpzAMT3jUpAOKpxiJ5EgAOUQAd29fJwBfSAAzdAlIAHIEFHtFQhIjQkTNLMhwxEgAXiDQgoAeAG1zRMQAJkQAFkSHJMQAdkQAVhaazgBGGIBmFqT4AA5sADZegMSY-uxm1vnJnv8kgHliTdHIDkghI-AAXQA+XNVIACE7TGLLa1t7coKL8AOzA4CA8dZIABEkHQ0Eg8EgAEdIABrUEAO2BgIA3B9gD8Au1-kDKJAcXjQficQCUd8flMsZBiPDQVSYLTkaj0ZAuhS6WDKbiOWziYz0Y0KfTrqCAAo00E80kBIasrmywJiiVo9F1CmitWQUVU9WixVM-oUgBKQRukAAiqCjQBpDm6yKXYzORAIkqudDuLw+RCvT3vA6JdD9eAQ6H9OHoYCUSOUfpR4B1OFdOPwGNDOPXfrC1NdQJ1YDC-PCjP54AGwLXU39A2W-rs6FQqldSDNcBAA)

## Basic usage

To get started, create a game and apply moves to it using a list of `{from}{to}` strings.

```ts
import type {
  Chessboard,
  FormatGame,
  NewGame,
} from '@bedard/chess-types'

type Game = NewGame<[
  'e2e4', 'e7e5',
  'g1f3', 'b8c6',
  'f1c4', 'f8c5',
  'O-O',  // ...
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
//     1: " R N B Q * R K - ";
// }

type Fen = FormatGame<Game>

// 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4'
```

There are many of other types available under the hood, more docs to come.

## License

[MIT](https://github.com/scottbedard/chess-types/blob/main/LICENSE)

Copyright (c) 2025-present, Scott Bedard
