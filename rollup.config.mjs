import { defineConfig } from 'rollup'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), 'package.json')
const version = JSON.parse(readFileSync(pkg, 'utf-8')).version

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'es',
      },
    ],
    plugins: [
      typescript(),
      {
        name: 'version',
        transform: code => code.replace(/x\.y\.z/, version),
      },
    ],
  },
])
