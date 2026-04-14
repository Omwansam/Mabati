/**
 * POST quote payload to your backend. Configure `VITE_QUOTE_API_URL` in `.env`.
 * When unset, resolves after a short delay (demo mode — no network).
 *
 * Expected JSON body (your API can extend this):
 * ```json
 * {
 *   "customer": {
 *     "name": "", "email": "", "phone": "",
 *     "productType": "", "deliveryAddress": "", "materials": "", "message": ""
 *   },
 *   "lines": [{
 *     "productId": "", "slug": "", "name": "", "price": 0, "priceMax": 0,
 *     "quantity": 1, "unit": ""
 *   }],
 *   "subtotal": 0,
 *   "submittedAt": "ISO-8601"
 * }
 * ```
 * CORS: allow your Vite dev origin and production domain on the API.
 *
 * @param {{
 *   customer: {
 *     name: string
 *     email: string
 *     phone: string
 *     productType: string
 *     deliveryAddress: string
 *     materials: string
 *     message: string
 *   }
 *   lines: Array<{
 *     productId: string
 *     slug: string
 *     name: string
 *     price: number
 *     priceMax?: number
 *     quantity: number
 *     unit?: string
 *   }>
 *   subtotal: number
 * }} body
 * @returns {Promise<{ ok: boolean, mode?: string }>}
 */
export async function submitQuoteRequest(body) {
  const url = import.meta.env.VITE_QUOTE_API_URL?.trim()

  if (!url) {
    await new Promise((r) => setTimeout(r, 450))
    if (import.meta.env.DEV) {
      console.info('[submitQuoteRequest] demo mode — payload:', body)
    }
    return { ok: true, mode: 'demo' }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...body,
      submittedAt: new Date().toISOString(),
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed (${res.status})`)
  }

  try {
    return await res.json()
  } catch {
    return { ok: true }
  }
}
