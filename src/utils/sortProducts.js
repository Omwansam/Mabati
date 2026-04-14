/**
 * @param {import('../data/products.js').Product[]} list
 * @param {string} sortKey
 */
export function sortProducts(list, sortKey) {
  const copy = [...list]
  switch (sortKey) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'popularity':
      return copy.sort((a, b) => {
        const ap = a.popularity ?? 0
        const bp = b.popularity ?? 0
        if (bp !== ap) return bp - ap
        return a.name.localeCompare(b.name)
      })
    case 'latest':
      return copy.sort((a, b) => {
        const ad = a.listedAt ?? ''
        const bd = b.listedAt ?? ''
        if (bd !== ad) return bd.localeCompare(ad)
        return a.name.localeCompare(b.name)
      })
    case 'default':
    case 'featured':
    default:
      return copy.sort((a, b) => {
        const af = a.featured ? 0 : 1
        const bf = b.featured ? 0 : 1
        if (af !== bf) return af - bf
        const ap = a.popularity ?? 0
        const bp = b.popularity ?? 0
        if (bp !== ap) return bp - ap
        return a.name.localeCompare(b.name)
      })
  }
}
