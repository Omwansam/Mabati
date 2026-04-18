import { SITE_PRODUCT_FALLBACK_IMAGE } from '../data/site.js'

/** @param {string | undefined | null} image */
export function productImageUrl(image) {
  return image && String(image).trim() ? image : SITE_PRODUCT_FALLBACK_IMAGE
}
