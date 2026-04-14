const kes = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})

export function formatPrice(amount) {
  return kes.format(amount)
}

/**
 * @param {{ price: number, priceMax?: number }} product
 */
export function formatProductPrice(product) {
  const max = product.priceMax
  if (max != null && max > product.price) {
    return `${formatPrice(product.price)} – ${formatPrice(max)}`
  }
  return formatPrice(product.price)
}
