import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const productSlugs = [
  'it4-galvanised-sheet',
  'it5-colour-coated-sheet',
  'box-profile-mrp25-charcoal',
  'stone-coated-tile-terracotta',
  'stone-coated-tile-charcoal',
  'roman-profile-pressed-tile',
  'half-round-gutter-4m',
  'square-downpipe-kit',
  'ridge-cap-vented-3m',
  'foil-insulation-40sqm',
  'fibreglass-blanket-75mm',
  'tek-screw-timber-bag100',
  'tek-screw-steel-bag100',
  'foam-closure-it4',
  'valley-gutter-pressed',
]

const categorySlugs = [
  'corrugated-sheets',
  'roofing-tiles',
  'gutters-accessories',
  'insulation',
  'fasteners',
]

function productSvg(hue) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 32%, 32%)"/>
      <stop offset="100%" stop-color="hsl(${hue}, 38%, 18%)"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <g stroke="rgba(251,191,36,0.4)" stroke-width="2.5" fill="none">
    <path d="M16 210 L52 148 L88 210 L124 138 L160 210 L196 132 L232 210 L268 128 L304 210 L340 125 L376 210"/>
  </g>
</svg>`
}

function categorySvg(hue, accent) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue}, 28%, 38%)"/>
      <stop offset="100%" stop-color="hsl(${hue}, 35%, 22%)"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#cg)"/>
  <g fill="none" stroke="${accent}" stroke-width="3" opacity="0.35">
    <path d="M0 320 L100 220 L200 300 L300 200 L400 280 L500 195 L600 270 L700 205 L800 285 L800 500 L0 500 Z"/>
  </g>
</svg>`
}

const heroSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="h" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="55%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#h)"/>
  <g stroke="rgba(251,191,36,0.12)" stroke-width="2" fill="none">
    <path d="M0 520 L160 380 L320 500 L480 360 L640 480 L800 340 L960 460 L1120 355 L1280 445 L1440 330 L1600 420"/>
  </g>
</svg>`

const dirs = [
  path.join(root, 'public', 'images', 'products'),
  path.join(root, 'public', 'images', 'categories'),
]

for (const d of dirs) fs.mkdirSync(d, { recursive: true })

productSlugs.forEach((slug, i) => {
  const hue = (i * 37 + 200) % 360
  fs.writeFileSync(
    path.join(root, 'public', 'images', 'products', `${slug}.svg`),
    productSvg(hue),
  )
})

const catHue = [210, 25, 195, 160, 35]
const catAccent = [
  'rgba(251,191,36,0.5)',
  'rgba(252,165,165,0.45)',
  'rgba(147,197,253,0.45)',
  'rgba(167,243,208,0.45)',
  'rgba(253,230,138,0.5)',
]

categorySlugs.forEach((slug, i) => {
  fs.writeFileSync(
    path.join(root, 'public', 'images', 'categories', `${slug}.svg`),
    categorySvg(catHue[i] ?? 200, catAccent[i] ?? 'rgba(251,191,36,0.5)'),
  )
})

fs.writeFileSync(path.join(root, 'public', 'images', 'hero-bg.svg'), heroSvg)

console.log('Wrote product, category, and hero SVGs under public/images/')
