/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number | null} price — KES; null when price is on request via WhatsApp
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {string} slug
 * @property {boolean} [featured]
 * @property {string} [unit]
 * @property {number} [popularity]
 * @property {string} [listedAt]
 */

/**
 * @typedef {Omit<Product, 'image'> & { filename: string }} ProductRow
 */

/** @param {string} filename Must match a file in public/images/products/ exactly. */
function productImage(filename) {
  return `/images/products/${encodeURIComponent(filename)}`
}

/**
 * One row per file in public/images/products/.
 * When you add a new photo, add a row here with the exact `filename` (run `npm run build` to verify).
 * @type {ProductRow[]}
 */
const PRODUCT_ROWS = [
  {
    filename: 'Aluzin Mabati ksh 620.jpeg',
    id: 'p-aluzin',
    name: 'Aluzin mabati',
    price: 620,
    description:
      'Aluzin coated roofing sheet — listed at a fixed public price per metre; confirm colour and length on WhatsApp.',
    category: 'corrugated-sheets',
    slug: 'aluzin-mabati',
    featured: true,
    unit: 'per metre',
    popularity: 88,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Box Box Mabati  ksh 470.jpeg',
    id: 'p-box-box',
    name: 'Box box mabati',
    price: 470,
    description:
      'Box profile sheet for clean roof lines — fixed list price per metre.',
    category: 'corrugated-sheets',
    slug: 'box-box-mabati',
    unit: 'per metre',
    popularity: 86,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Brixmax Mabati ksh 570.jpeg',
    id: 'p-brixmax',
    name: 'Brixmax mabati',
    price: 570,
    description:
      'Brixmax stone-coated style profile — fixed list price per metre.',
    category: 'roofing-tiles',
    slug: 'brixmax-mabati',
    featured: true,
    unit: 'per metre',
    popularity: 90,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Chainlink.jpeg',
    id: 'p-chainlink',
    name: 'Chainlink fencing',
    price: null,
    description:
      'Chainlink rolls and posts — price depends on height and gauge. Message us on WhatsApp for a firm quote.',
    category: 'fencing',
    slug: 'chainlink-fencing',
    popularity: 70,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Classic tiles 550.jpeg',
    id: 'p-classic-tiles',
    name: 'Classic tiles',
    price: 550,
    description: 'Classic tile profile — fixed list price per metre.',
    category: 'roofing-tiles',
    slug: 'classic-tiles',
    unit: 'per metre',
    popularity: 82,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Corrugated Mabati ksh 420.jpeg',
    id: 'p-corrugated',
    name: 'Corrugated mabati',
    price: 420,
    description:
      'Standard corrugated iron sheet — fixed list price per metre.',
    category: 'corrugated-sheets',
    slug: 'corrugated-mabati',
    featured: true,
    unit: 'per metre',
    popularity: 95,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Crimped Mabati kh 600.jpeg',
    id: 'p-crimped',
    name: 'Crimped mabati',
    price: 600,
    description:
      'Crimped / curved sheet for feature roofs — fixed list price per metre.',
    category: 'corrugated-sheets',
    slug: 'crimped-mabati',
    unit: 'per metre',
    popularity: 72,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Cut & Bend stirrups .jpeg',
    id: 'p-cut-bend',
    name: 'Cut & bend stirrups',
    price: null,
    description:
      'Reinforcement cut and bent to drawing — priced per schedule. WhatsApp your list or drawings.',
    category: 'building-materials',
    slug: 'cut-bend-stirrups',
    popularity: 55,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Euromax Mabati ksh 570.jpeg',
    id: 'p-euromax',
    name: 'Euromax mabati',
    price: 570,
    description: 'Euromax profile — fixed list price per metre.',
    category: 'roofing-tiles',
    slug: 'euromax-mabati',
    unit: 'per metre',
    popularity: 84,
    listedAt: '2026-04-01',
  },
  {
    filename: 'High crip BRC Mesh ksh 15,000.jpeg',
    id: 'p-brc-mesh',
    name: 'High crip BRC mesh',
    price: 15000,
    description:
      'BRC mesh for slabs and walls — fixed list price per unit shown.',
    category: 'building-materials',
    slug: 'high-crip-brc-mesh',
    unit: 'per sheet / unit',
    popularity: 68,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Kilplok Roof ksh 600.jpeg',
    id: 'p-kilplok',
    name: 'Kilplok roof',
    price: 600,
    description: 'Kilplok concealed-fix profile — fixed list price per metre.',
    category: 'roofing-tiles',
    slug: 'kilplok-roof',
    unit: 'per metre',
    popularity: 80,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Light gauge steel.jpeg',
    id: 'p-light-gauge',
    name: 'Light gauge steel',
    price: null,
    description:
      'Light gauge sections for trusses and purlins — priced by section and length. WhatsApp your requirements.',
    category: 'building-materials',
    slug: 'light-gauge-steel',
    popularity: 76,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Milano Tiles.jpeg',
    id: 'p-milano',
    name: 'Milano tiles',
    price: null,
    description:
      'Milano tile-look profile — confirm colour and current list price on WhatsApp.',
    category: 'roofing-tiles',
    slug: 'milano-tiles',
    popularity: 78,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Pvc fascia board ksh 2,000.jpeg',
    id: 'p-pvc-fascia',
    name: 'PVC fascia board',
    price: 2000,
    description: 'uPVC fascia board — fixed list price per length as shown.',
    category: 'building-materials',
    slug: 'pvc-fascia-board',
    unit: 'per length',
    popularity: 74,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Romax Mabati ksh 570.jpeg',
    id: 'p-romax',
    name: 'Romax mabati',
    price: 570,
    description: 'Romax stone-coated profile — fixed list price per metre.',
    category: 'roofing-tiles',
    slug: 'romax-mabati',
    featured: true,
    unit: 'per metre',
    popularity: 92,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Roof Instalation ksh 13,000.jpeg',
    id: 'p-roof-install',
    name: 'Roof installation',
    price: 13000,
    description:
      'Professional roof installation — fixed list price shown; confirm site details on WhatsApp before booking.',
    category: 'services',
    slug: 'roof-installation',
    featured: true,
    unit: 'per job',
    popularity: 88,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Roofing Shingles ksh 550.jpeg',
    id: 'p-shingles',
    name: 'Roofing shingles',
    price: 550,
    description: 'Roofing shingles — fixed list price per metre as shown.',
    category: 'roofing-tiles',
    slug: 'roofing-shingles',
    unit: 'per metre',
    popularity: 83,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Twisted Fence 7,000.jpeg',
    id: 'p-twisted-fence',
    name: 'Twisted fence',
    price: 7000,
    description: 'Twisted fence line — fixed list price as shown.',
    category: 'fencing',
    slug: 'twisted-fence',
    unit: 'per roll / unit',
    popularity: 65,
    listedAt: '2026-04-01',
  },
  {
    filename: 'Z max Mabati ksh 570.jpeg',
    id: 'p-zmax',
    name: 'Z max mabati',
    price: 570,
    description: 'Z max profile — fixed list price per metre.',
    category: 'roofing-tiles',
    slug: 'z-max-mabati',
    unit: 'per metre',
    popularity: 87,
    listedAt: '2026-04-01',
  },
]

/** Filenames currently wired into the catalogue (matches folder). */
export const PRODUCT_IMAGE_FILENAMES = PRODUCT_ROWS.map((r) => r.filename)

/** @type {Product[]} */
export const products = PRODUCT_ROWS.map(({ filename, ...rest }) => ({
  ...rest,
  image: productImage(filename),
}))

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null
}
