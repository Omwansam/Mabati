/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} [priceMax] — upper end of public “from – to” range (KES)
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {string} slug
 * @property {boolean} [featured]
 * @property {string} [unit]
 * @property {number} [popularity] — higher appears first when sorting by popularity
 * @property {string} [listedAt] — ISO date for “latest” sort
 */

const img = {
  roof: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  metal: 'https://images.unsplash.com/photo-1581092160562-40aa08e66837?w=800&q=80',
  tile: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  roof2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  build: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  sheet: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  gutter: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
  insul: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  screw: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
  nail: 'https://images.unsplash.com/photo-1572986719247-9817e7e9d0db?w=800&q=80',
  pvc: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  sky: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
}

/** @type {Product[]} */
export const products = [
  {
    id: 'p1',
    name: 'Brickmax mabati',
    price: 680,
    priceMax: 2340,
    description:
      'Stone-coated profile in the Brickmax line — multiple colours and gauges. Typical residential and commercial pitches.',
    category: 'roofing-tiles',
    image: img.tile,
    slug: 'brickmax-mabati',
    featured: true,
    unit: 'from / metre',
    popularity: 92,
    listedAt: '2026-01-12',
  },
  {
    id: 'p2',
    name: 'Romax mabati',
    price: 680,
    priceMax: 2340,
    description:
      'Romax stone-coated steel tile look — lightweight vs. concrete, strong wind and rain performance when installed to spec.',
    category: 'roofing-tiles',
    image: img.roof2,
    slug: 'romax-mabati',
    featured: true,
    unit: 'from / metre',
    popularity: 88,
    listedAt: '2026-01-08',
  },
  {
    id: 'p3',
    name: 'Z-Max roof tile',
    price: 680,
    priceMax: 2340,
    description:
      'Z-Max pressed profile with granular finish. Ask our team for cover width and minimum pitch for your project.',
    category: 'roofing-tiles',
    image: img.sky,
    slug: 'z-max-roof-tile',
    unit: 'from / metre',
    popularity: 78,
    listedAt: '2025-11-20',
  },
  {
    id: 'p4',
    name: 'Euromax mabati',
    price: 680,
    priceMax: 2340,
    description:
      'Euromax series stone-coated sheet — suited to modern elevations; compatible with standard ridges and accessories.',
    category: 'roofing-tiles',
    image: img.tile,
    slug: 'euromax-mabati',
    unit: 'from / metre',
    popularity: 74,
    listedAt: '2025-10-05',
  },
  {
    id: 'p5',
    name: 'Boxmax mabati',
    price: 620,
    priceMax: 2160,
    description:
      'Box-rib industrial and residential profile. Available in several colours; ideal for clean straight roof lines.',
    category: 'corrugated-sheets',
    image: img.sheet,
    slug: 'boxmax-mabati',
    featured: true,
    unit: 'from / metre',
    popularity: 85,
    listedAt: '2026-02-01',
  },
  {
    id: 'p6',
    name: 'S-Max corrugated mabati',
    price: 560,
    priceMax: 2160,
    description:
      'Classic corrugated IT-style profile — galvanised and pre-painted options. Workhorse for sheds, housing, and warehouses.',
    category: 'corrugated-sheets',
    image: img.metal,
    slug: 's-max-corrugated-mabati',
    featured: true,
    unit: 'from / metre',
    popularity: 95,
    listedAt: '2026-02-15',
  },
  {
    id: 'p7',
    name: 'Crimped mabati',
    price: 1000,
    priceMax: 3600,
    description:
      'Curved crimped sheets for architectural barrel vaults and feature roofs. Custom radius subject to tooling.',
    category: 'corrugated-sheets',
    image: img.build,
    slug: 'crimped-mabati',
    unit: 'from / metre',
    popularity: 62,
    listedAt: '2025-09-14',
  },
  {
    id: 'p8',
    name: 'Translucent sheets',
    price: 4000,
    priceMax: 6000,
    description:
      'Daylight panels for rooflights — match common sheet profiles; reduces need for electrical lighting during daytime.',
    category: 'gutters-accessories',
    image: img.roof,
    slug: 'translucent-sheets',
    unit: 'from / sheet',
    popularity: 55,
    listedAt: '2025-12-01',
  },
  {
    id: 'p9',
    name: 'Roof insulation',
    price: 20900,
    priceMax: 45600,
    description:
      'Foil-faced and blanket insulation systems for temperature comfort. Sizes and R-values quoted per project.',
    category: 'insulation',
    image: img.insul,
    slug: 'roof-insulation',
    featured: true,
    unit: 'from / roll',
    popularity: 70,
    listedAt: '2026-01-22',
  },
  {
    id: 'p10',
    name: 'Rolltop flashing',
    price: 800,
    priceMax: 900,
    description:
      'Rolltop edge detail for sheet ends — helps wind-driven rain performance at eaves and barge boards.',
    category: 'gutters-accessories',
    image: img.gutter,
    slug: 'rolltop-mabati',
    unit: 'from / length',
    popularity: 48,
    listedAt: '2025-08-10',
  },
  {
    id: 'p11',
    name: 'Ridge caps',
    price: 800,
    priceMax: 900,
    description:
      'Ridge and hip capping for corrugated and box profiles — vented options available on request.',
    category: 'gutters-accessories',
    image: img.pvc,
    slug: 'ridge-caps',
    unit: 'from / length',
    popularity: 66,
    listedAt: '2025-07-18',
  },
  {
    id: 'p12',
    name: 'Valley gutter',
    price: 800,
    priceMax: 900,
    description:
      'Pressed valley sections for internal roof valleys — primed or colour-coated to match roof sheets.',
    category: 'gutters-accessories',
    image: img.gutter,
    slug: 'valley-gutter',
    unit: 'from / length',
    popularity: 58,
    listedAt: '2025-07-20',
  },
  {
    id: 'p13',
    name: 'Roofing washers',
    price: 150,
    description:
      'Bonded washers for tek screws — helps seal penetrations through metal sheets.',
    category: 'fasteners',
    image: img.screw,
    slug: 'roofing-washers',
    unit: 'per pack',
    popularity: 42,
    listedAt: '2025-06-01',
  },
  {
    id: 'p14',
    name: 'Coloured roofing nails',
    price: 550,
    description:
      'Colour-headed nails to blend with tile or sheet finishes; for timber battens where specified.',
    category: 'fasteners',
    image: img.nail,
    slug: 'coloured-roofing-nails',
    unit: 'per pack',
    popularity: 40,
    listedAt: '2025-06-15',
  },
  {
    id: 'p15',
    name: 'Self-drilling roof screws',
    price: 1800,
    description:
      'Hex-head self-drill fasteners with washers — timber and steel purlin variants; anti-corrosion coating.',
    category: 'fasteners',
    image: img.screw,
    slug: 'self-drilling-roof-screws',
    featured: true,
    unit: 'per box',
    popularity: 72,
    listedAt: '2025-11-02',
  },
  {
    id: 'p16',
    name: 'Roofing nails',
    price: 300,
    description:
      'General-purpose roofing nails for softwood battens; galvanised finish.',
    category: 'fasteners',
    image: img.nail,
    slug: 'roofing-nails',
    unit: 'per kg',
    popularity: 38,
    listedAt: '2025-05-22',
  },
  {
    id: 'p17',
    name: 'PVC fascia boards',
    price: 3000,
    description:
      'uPVC fascia planks — low maintenance alternative to timber; multiple widths and colours.',
    category: 'gutters-accessories',
    image: img.pvc,
    slug: 'pvc-fascia-boards',
    unit: 'from / length',
    popularity: 52,
    listedAt: '2025-10-28',
  },
  {
    id: 'p18',
    name: 'PVC fascia joiners',
    price: 350,
    description:
      'Joiner moulds for continuous fascia runs; colour-matched to boards.',
    category: 'gutters-accessories',
    image: img.pvc,
    slug: 'pvc-fascia-joiners',
    unit: 'each',
    popularity: 28,
    listedAt: '2025-10-28',
  },
  {
    id: 'p19',
    name: 'PVC fascia ends',
    price: 350,
    description:
      'End caps for fascia boards — neat termination at gables and corners.',
    category: 'gutters-accessories',
    image: img.pvc,
    slug: 'pvc-fascia-ends',
    unit: 'each',
    popularity: 26,
    listedAt: '2025-10-29',
  },
]

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null
}
