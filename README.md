# `@bedard/chess-types`

[![Test](https://github.com/scottbedard/type-chess/actions/workflows/test.yml/badge.svg)](https://github.com/scottbedard/type-chess/actions/workflows/test.yml)
[![NPM](https://img.shields.io/npm/v/%40bedard%2Fchess-types)](https://www.npmjs.com/package/@bedard/chess-types)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://github.com/scottbedard/chess-types/blob/main/LICENSE)


Welcome to a strange TypeScript exercise, our goal is to play chess inside the type system.

[Click here to start exploring &rarr;](https://www.typescriptlang.org/play/?noErrorTruncation=true#code/PQKhCgAIUgBAjApgEwIYCdnAMYAtEDOBAtAC4CeADoVDLZLqaZQQFzDADmAlqbgK7wAdNgD2AW2AExTJGkw58RMlRrRg4cN3GVR6UpArVIAbyiQAwkoLxRGZABpzF-unSIAdqQCyogG6EAKoeBKgAZohOkJAA8tjY-JTcKABC5FGQAAoYBIgAYp5OAL6QYegSkADkCCj2ioQkRoSVmhyQ2O6opIiQqJAeiADukJyo4ojgTZAA4mM9ALxZOfmeADyV6B7wAI4A1vAe6MCUJ6cnwAAcl9dXmXf3d8AASgByKQCKANIpL0+Qw593rttpBiJAAAyQACMlQAfK1gCNEAZdAReNxRCFIKJ4olkshIPByL12qIADZ6SaqSApMmobC7SCLOIJJKpcjreCVBwzObwqYAdVwvAWsVxbOQaXWg25vPG8PAbU4yN6ZLJ7Vc7i8kHE-kIPMQAQ82IGBEMuC6OtQxPcBH4ZIM3GNuTJYWIeEQDKpxl8AQIwVCESZlk1nh8ev9IXCiFWs3lCJGc0odOJ3DNBFI3DVkCd5p6gz0uwIPPg-AMgyz6rJ3F2iDJxIpokZ1dr5rTQkViLEXid-FQauJqGQyCdnEgAAMXogAB7hgLj9qdTMeMd9UbjSB+M18HpiHRZxDoTudwzUqez32izIp2NzHkAbUqiAATIgACyyoRfgC6CrauD1dBDFESBch6Wx7G9HoYjLSgy2DKwGggzBb3jIA)

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
