import { dirname, resolve } from 'node:path'
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))
const build = resolve(dir, 'build')
const dist = resolve(dir, 'dist')
const index = resolve(dist, 'index.d.ts')
const pkg = JSON.parse(readFileSync(resolve(dir, 'package.json'), 'utf8'))

const cleanup = () => existsSync(build) && rmSync(build, { recursive: true })

cleanup()

renameSync(dist, build)

renameSync(resolve(build, 'src'), dist)

writeFileSync(index, readFileSync(index, 'utf8').replace('x.y.z', pkg.version))

writeFileSync(resolve(dist, 'index.mjs'), `const pkg = '@bedard/chess-types - ${pkg.version}';\nexport { pkg };\n`)

cleanup()

console.log('\x1b[32m','Done')
