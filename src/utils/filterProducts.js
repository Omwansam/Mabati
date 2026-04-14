/**
 * @param {import('../data/products.js').Product[]} list
 * @param {{
 *   categorySlug?: string
 *   minPrice?: number
 *   maxPrice?: number
 *   searchQuery?: string
 * }} filters
 */
function upperPrice(/** @type {{ price: number, priceMax?: number }} */ p) {
  return p.priceMax ?? p.price
}

export function filterProducts(list, filters) {
  const { categorySlug, minPrice, maxPrice, searchQuery } = filters
  const q = searchQuery?.trim().toLowerCase() ?? ''
  return list.filter((p) => {
    if (categorySlug && categorySlug !== 'all' && p.category !== categorySlug) {
      return false
    }
    if (minPrice != null && upperPrice(p) < minPrice) return false
    if (maxPrice != null && p.price > maxPrice) return false
    if (q) {
      const haystack = `${p.name} ${p.description} ${p.category}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}
