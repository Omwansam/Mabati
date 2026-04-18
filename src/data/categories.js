/** @typedef {{ slug: string, name: string, description: string, image: string }} Category */

/** @type {Category[]} */
export const categories = [
  {
    slug: 'corrugated-sheets',
    name: 'Corrugated & box profiles',
    description:
      'Corrugated, box profile, Aluzin, and crimped sheets — fixed list prices per metre where shown.',
    image: '/images/products/Corrugated%20Mabati%20ksh%20420.jpeg',
  },
  {
    slug: 'roofing-tiles',
    name: 'Roofs & tile profiles',
    description:
      'Brixmax, Romax, Euromax, Z max, Kilplok, classic and Milano-style lines, plus shingles.',
    image: '/images/products/Brixmax%20Mabati%20ksh%20570.jpeg',
  },
  {
    slug: 'fencing',
    name: 'Fencing',
    description: 'Chainlink and twisted fence products — firm pricing on WhatsApp where needed.',
    image: '/images/products/Chainlink.jpeg',
  },
  {
    slug: 'building-materials',
    name: 'Building materials',
    description:
      'PVC fascia, BRC mesh, light gauge steel, and cut & bend reinforcement — quotes on request.',
    image: '/images/products/Pvc%20fascia%20board%20ksh%202%2C000.jpeg',
  },
  {
    slug: 'services',
    name: 'Installation & services',
    description: 'Roof installation and on-site support — confirm scope and price before work.',
    image: '/images/products/Roof%20Instalation%20ksh%2013%2C000.jpeg',
  },
]

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) ?? null
}
