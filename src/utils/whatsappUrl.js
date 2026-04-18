import { SITE_WHATSAPP } from '../data/site.js'

/**
 * @param {string} text
 */
export function getWhatsAppUrl(text) {
  const body = text.trim() || 'Hello, I would like a quote.'
  return `https://wa.me/${SITE_WHATSAPP}?text=${encodeURIComponent(body)}`
}
