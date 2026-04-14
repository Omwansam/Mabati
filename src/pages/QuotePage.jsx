import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { QUOTE_PRODUCT_TYPES } from '../data/site.js'
import { useQuoteCart } from '../hooks/useQuoteCart.js'
import { submitQuoteRequest } from '../services/submitQuoteRequest.js'
import { formatPrice, formatProductPrice } from '../utils/formatPrice.js'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Select } from '../components/ui/Select.jsx'
import { Textarea } from '../components/ui/Textarea.jsx'

export function QuotePage() {
  const {
    items,
    setLineQuantity,
    removeLine,
    clearQuote,
    subtotal,
    totalQuantity,
  } = useQuoteCart()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(/** @type {string | null} */ (null))
  const [errors, setErrors] = useState(
    /** @type {Record<string, string>} */ ({}),
  )

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    if (!(form instanceof HTMLFormElement)) return
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const productType = String(fd.get('productType') ?? '').trim()
    const deliveryAddress = String(fd.get('deliveryAddress') ?? '').trim()
    const materials = String(fd.get('materials') ?? '').trim()
    const message = String(fd.get('message') ?? '').trim()
    const nextErrors = /** @type {Record<string, string>} */ ({})
    if (!name) nextErrors.name = 'Enter your name'
    if (!email) nextErrors.email = 'Enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = 'Enter a valid email'
    if (!phone) nextErrors.phone = 'Enter a phone number'
    if (!productType) nextErrors.productType = 'Choose a product type'
    if (!deliveryAddress) nextErrors.deliveryAddress = 'Enter delivery address'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      await submitQuoteRequest({
        customer: {
          name,
          email,
          phone,
          productType,
          deliveryAddress,
          materials,
          message,
        },
        lines: items.map((l) => ({
          productId: l.productId,
          slug: l.slug,
          name: l.name,
          price: l.price,
          priceMax: l.priceMax,
          quantity: l.quantity,
          unit: l.unit,
        })),
        subtotal,
      })
      setSubmitted(true)
      clearQuote()
      form.reset()
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Could not send your quote.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0 && submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6 lg:px-8">
        <Seo
          title="Quote sent"
          description="Your quote request was submitted to Mabati Yetu."
          path="/quote"
        />
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-10">
          <p className="text-lg font-semibold text-amber-950">
            Quote request sent
          </p>
          <p className="mt-2 text-slate-700">
            Thank you. We will contact you shortly to confirm availability,
            quantities, and delivery.
          </p>
          <Button as={Link} to="/catalog" variant="primary" className="mt-8">
            Continue shopping
          </Button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6 lg:px-8">
        <Seo
          title="Quote"
          description="Review your roofing materials list and send a quote request to Mabati Yetu."
          path="/quote"
        />
        <h1 className="text-2xl font-bold text-slate-900">Your quote is empty</h1>
        <p className="mt-2 text-slate-600">
          Add products from the catalogue, then return here to send us your list.
        </p>
        <Button as={Link} to="/catalog" variant="primary" className="mt-8" size="lg">
          Browse products
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title="Request a quote"
        description="Send your Mabati Yetu product list and contact details for pricing and delivery."
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
        {totalQuantity} item{totalQuantity === 1 ? '' : 's'} in your list ·
        indicative subtotal {formatPrice(subtotal)} (using each line’s “from”
        price)
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
                    src={line.image}
                    alt={line.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-slate-900 hover:text-amber-800">
                      {line.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatProductPrice(line)}
                      {line.unit ? ` ${line.unit}` : ''}
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
                    {formatPrice(line.price * line.quantity)}
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
              Your details
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Set <code className="rounded bg-slate-100 px-1 text-xs">VITE_QUOTE_API_URL</code>{' '}
              to POST JSON to your API; otherwise submissions run in demo mode
              (console log in dev).
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <Input
                label="Full name"
                name="name"
                autoComplete="name"
                required
                error={errors.name}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                required
                error={errors.email}
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                error={errors.phone}
              />
              <Select
                label="Type of product"
                name="productType"
                required
                defaultValue=""
                error={errors.productType}
              >
                {QUOTE_PRODUCT_TYPES.map((opt) => (
                  <option key={opt.value || 'empty'} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
              <Textarea
                label="List materials / quantities (optional)"
                name="materials"
                rows={3}
                placeholder="e.g. S-Max charcoal 30 m, ridge caps 12 m…"
              />
              <Input
                label="Delivery address"
                name="deliveryAddress"
                autoComplete="street-address"
                required
                error={errors.deliveryAddress}
                placeholder="County, town, landmark or site access notes"
              />
              <Textarea
                label="Other notes (optional)"
                name="message"
                placeholder="Roof size, colour preferences, timeline…"
              />
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Indicative subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>
              {submitError ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                  {submitError}
                </p>
              ) : null}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Submit quote request'}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
