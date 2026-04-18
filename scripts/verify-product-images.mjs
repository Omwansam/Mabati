/**
 * Ensures public/images/products and src/data/products.js stay in sync:
 * every image file has exactly one catalog row (filename: '...').
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dir = path.join(root, 'public/images/products')
const productsFile = path.join(root, 'src/data/products.js')

const extOk = /\.(jpe?g|png|webp)$/i

const onDisk = fs
  .readdirSync(dir)
  .filter((f) => extOk.test(f))
  .sort((a, b) => a.localeCompare(b))

const source = fs.readFileSync(productsFile, 'utf8')
const fromCode = [...source.matchAll(/filename:\s*'([^']+)'/g)].map((m) => m[1])

const missingOnDisk = fromCode.filter((f) => !onDisk.includes(f))
const missingInCode = onDisk.filter((f) => !fromCode.includes(f))
const dupes = fromCode.filter((f, i) => fromCode.indexOf(f) !== i)

if (dupes.length) {
  console.error('Duplicate filename entries in products.js:', [...new Set(dupes)])
  process.exit(1)
}
if (missingOnDisk.length) {
  console.error(
    'products.js references files that are not in public/images/products:',
    missingOnDisk,
  )
  process.exit(1)
}
if (missingInCode.length) {
  console.error(
    'Add a catalog row for each file in public/images/products (filename: \'...\'). Missing:',
    missingInCode,
  )
  process.exit(1)
}

console.log(
  `OK: ${onDisk.length} product image(s) in public/images/products match products.js manifest.`,
)
