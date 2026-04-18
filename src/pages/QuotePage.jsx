import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { SITE_BRAND } from '../data/site.js'
import { useQuoteCart } from '../hooks/useQuoteCart.js'
import { formatPrice, formatProductPrice } from '../utils/formatPrice.js'
import { productImageUrl } from '../utils/productImageUrl.js'
import { getWhatsAppUrl } from '../utils/whatsappUrl.js'
import { Button } from '../components/ui/Button.jsx'
import { Textarea } from '../components/ui/Textarea.jsx'

function buildQuoteWhatsAppMessage(items, notes, subtotal, hasUnpriced) {
  const lines = items.map((l) => {
    const unit = l.unit ? ` (${l.unit})` : ''
    const price =
      l.price != null
        ? ` — ${formatPrice(l.price)} each`
        : ' — price on request'
    return `• ${l.quantity}× ${l.name}${price}${unit}`
  })
  let msg = `Hello ${SITE_BRAND},\n\nPlease quote the following:\n\n${lines.join('\n')}`
  if (notes.trim()) msg += `\n\nNotes: ${notes.trim()}`
  if (hasUnpriced) {
    msg += `\n\nSubtotal (priced lines only): ${formatPrice(subtotal)}`
    msg += '\nPlease confirm prices for any “price on request” lines.'
  } else {
    msg += `\n\nLine total (listed prices × qty): ${formatPrice(subtotal)}`
  }
  return msg
}

export function QuotePage() {
  const {
    items,
    setLineQuantity,
    removeLine,
    clearQuote,
    subtotal,
    totalQuantity,
  } = useQuoteCart()
  const [notes, setNotes] = useState('')

  const hasUnpriced = useMemo(
    () => items.some((l) => l.price == null),
    [items],
  )

  const waHref = useMemo(() => {
    if (items.length === 0) return getWhatsAppUrl('')
    return getWhatsAppUrl(
      buildQuoteWhatsAppMessage(items, notes, subtotal, hasUnpriced),
    )
  }, [items, notes, subtotal, hasUnpriced])

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6 lg:px-8">
        <Seo
          title="Quote"
          description="Build your list on Ruiru Mabati and send it on WhatsApp for pricing and delivery."
          path="/quote"
        />
        <h1 className="text-2xl font-bold text-slate-900">Your quote is empty</h1>
        <p className="mt-2 text-slate-600">
          Add products from the catalogue, then return here to send your list on
          WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button as={Link} to="/catalog" variant="primary" size="lg">
            Browse products
          </Button>
          <Button as="a" href={waHref} variant="outline" size="lg">
            Message on WhatsApp
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Request a quote"
        description="Review your list and send it to Ruiru Mabati on WhatsApp."
        path="/quote"
      />
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-amber-700">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-slate-800">Quote</span>
      </nav>

      <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
        Request a quote
      </h1>
      <p className="mt-2 text-slate-600">
        {totalQuantity} item{totalQuantity === 1 ? '' : 's'} in your list
        {hasUnpriced ? (
          <>
            {' '}
            · subtotal {formatPrice(subtotal)} (priced lines only)
          </>
        ) : (
          <>
            {' '}
            · total {formatPrice(subtotal)}
          </>
        )}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-12">
        <section className="lg:col-span-3">
          <h2 className="text-lg font-semibold text-slate-900">Line items</h2>
          <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {items.map((line) => (
              <li
                key={line.productId}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <Link
                  to={`/product/${line.slug}`}
                  className="flex shrink-0 gap-4 sm:items-center"
                >
                  <img
                    src={productImageUrl(line.image)}
                    alt={line.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-slate-900 hover:text-amber-800">
                      {line.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatProductPrice(line)}
                      {line.unit ? ` · ${line.unit}` : ''}
                    </p>
                  </div>
                </Link>
                <div className="flex flex-1 flex-wrap items-center justify-end gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="sr-only">Quantity</span>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={line.quantity}
                      onChange={(e) => {
                        const n = Number.parseInt(e.target.value, 10)
                        setLineQuantity(
                          line.productId,
                          Number.isFinite(n) ? n : 1,
                        )
                      }}
                      className="w-20 rounded-lg border border-slate-300 px-2 py-1.5 text-center text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </label>
                  <p className="min-w-[6rem] text-right font-semibold text-slate-900">
                    {line.price != null
                      ? formatPrice(line.price * line.quantity)
                      : '—'}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeLine(line.productId)}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => clearQuote()}
            className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Clear entire quote
          </button>
        </section>

        <section className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Send on WhatsApp
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Your list and notes open in WhatsApp so we can reply with stock,
              delivery, and any adjustments.
            </p>
            <div className="mt-6 space-y-4">
              <Textarea
                label="Extra details (optional)"
                name="quote-notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Delivery location, roof size, colour, timeline…"
              />
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{hasUnpriced ? 'Subtotal (priced lines)' : 'Total'}</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
              <Button as="a" href={waHref} variant="primary" size="lg" className="w-full">
                Open WhatsApp with this quote
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
