const kes = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

export function formatPrice(amount) {
  return kes.format(amount)
}

/**
 * @param {{ price: number | null, priceMax?: number }} product
 */
export function formatProductPrice(product) {
  if (product.price == null) {
    return 'Price on request'
  }
  const max = product.priceMax
  if (max != null && max > product.price) {
    return `${formatPrice(product.price)} – ${formatPrice(max)}`
  }
  return formatPrice(product.price)
}
