/** @typedef {{ slug: string, name: string, description: string, image: string }} Category */

/** @type {Category[]} */
export const categories = [
  {
    slug: 'corrugated-sheets',
    name: 'Corrugated & box profiles',
    description:
      'S-Max corrugated, Boxmax box-rib, and crimped architectural sheets — gauge and colour to spec.',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    slug: 'roofing-tiles',
    name: 'Stone-coated tiles',
    description:
      'Brickmax, Romax, Z-Max, Euromax and similar profiles — factory-finished for long service life.',
    image:
      'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80',
  },
  {
    slug: 'gutters-accessories',
    name: 'Accessories & daylighting',
    description:
      'Ridges, valleys, rolltop, translucent sheets, and PVC fascia — everything that completes the roof line.',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
  },
  {
    slug: 'insulation',
    name: 'Roof insulation',
    description:
      'Foil and blanket systems to cut heat gain and improve indoor comfort.',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
  },
  {
    slug: 'fasteners',
    name: 'Fasteners & nails',
    description:
      'Self-drilling screws, washers, coloured nails, and roofing nails — matched to your sheet system.',
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80',
  },
]

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) ?? null
}
