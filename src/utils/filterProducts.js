/**
 * @param {import('../data/products.js').Product[]} list
 * @param {{
 *   categorySlug?: string
 *   minPrice?: number
 *   maxPrice?: number
 *   searchQuery?: string
 * }} filters
 */
function upperPrice(/** @type {{ price: number | null, priceMax?: number }} */ p) {
  if (p.price == null) return null
  return p.priceMax ?? p.price
}

export function filterProducts(list, filters) {
  const { categorySlug, minPrice, maxPrice, searchQuery } = filters
  const q = searchQuery?.trim().toLowerCase() ?? ''
  const hasPriceBand = minPrice != null || maxPrice != null
  return list.filter((p) => {
    if (categorySlug && categorySlug !== 'all' && p.category !== categorySlug) {
      return false
    }
    if (hasPriceBand && p.price == null) return false
    const upper = upperPrice(p)
    if (minPrice != null && (upper == null || upper < minPrice)) return false
    if (maxPrice != null && (p.price == null || p.price > maxPrice)) return false
    if (q) {
      const haystack = `${p.name} ${p.description} ${p.category}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}
