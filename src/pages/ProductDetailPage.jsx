import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { getCategoryBySlug } from '../data/categories.js'
import { useQuoteCart } from '../hooks/useQuoteCart.js'
import { useProducts } from '../hooks/useProducts.js'
import { formatProductPrice } from '../utils/formatPrice.js'
import { productImageUrl } from '../utils/productImageUrl.js'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { ProductCard } from '../components/product/ProductCard.jsx'

export function ProductDetailPage() {
  const { slug } = useParams()
  const { addItem } = useQuoteCart()
  const { loading, products, error } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [addedMessage, setAddedMessage] = useState(null)

  const product = useMemo(
    () => products.find((p) => p.slug === slug) ?? null,
    [products, slug],
  )

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [products, product])

  function handleAddToCart() {
    addItem(product, quantity)
    setAddedMessage('show')
    window.setTimeout(() => setAddedMessage(null), 8000)
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Seo
          title="Product unavailable"
          description="We could not load this product. Return to the Ruiru Mabati shop."
          path="/catalog"
        />
        <div
          className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
          role="alert"
        >
          <p className="font-semibold text-red-800">Could not load product</p>
          <p className="mt-2 text-sm text-red-700">{error.message}</p>
          <Button as={Link} to="/catalog" variant="primary" className="mt-6">
            Back to shop
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Seo title="Product" description="Loading product…" path="/catalog" />
        <div className="animate-pulse">
          <div className="h-4 w-40 rounded bg-slate-200" />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="aspect-square rounded-2xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded bg-slate-200" />
              <div className="h-6 w-1/3 rounded bg-slate-200" />
              <div className="h-24 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <Seo
          title="Product not found"
          description="This product is not in the Ruiru Mabati catalogue."
          path={slug ? `/product/${slug}` : '/catalog'}
          noindex
        />
        <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
        <p className="mt-2 text-slate-600">
          The link may be outdated, or the item may no longer be listed.
        </p>
        <Button as={Link} to="/catalog" variant="primary" className="mt-8">
          Browse catalogue
        </Button>
      </div>
    )
  }

  const cat = getCategoryBySlug(product.category)
  const metaDescription =
    product.description.length > 155
      ? `${product.description.slice(0, 152)}…`
      : product.description

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title={product.name}
        description={metaDescription}
        path={`/product/${product.slug}`}
        ogImage={productImageUrl(product.image)}
      />
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-amber-700">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <Link to="/catalog" className="hover:text-amber-700">
          Shop
        </Link>
        {cat ? (
          <>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <Link
              to={`/catalog/${cat.slug}`}
              className="hover:text-amber-700"
            >
              {cat.name}
            </Link>
          </>
        ) : null}
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src={productImageUrl(product.image)}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-amber-700">
            {cat?.name ?? product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-amber-700">
            {formatProductPrice(product)}
            {product.unit ? (
              <span className="text-lg font-normal text-slate-500">
                {' '}
                {product.unit}
              </span>
            ) : null}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {product.price != null
              ? 'Listed price is fixed as shown. Delivery and extras are confirmed when you message us.'
              : 'Ask on WhatsApp for a firm price and availability for this item.'}
          </p>
          <p className="mt-6 text-slate-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <Input
              label="Quantity"
              type="number"
              name="quantity"
              min={1}
              max={999}
              value={quantity}
              onChange={(e) => {
                const n = Number.parseInt(e.target.value, 10)
                setQuantity(Number.isFinite(n) && n >= 1 ? Math.min(n, 999) : 1)
              }}
            />
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" onClick={handleAddToCart}>
                Add to quote
              </Button>
              <Button as={Link} to="/catalog" variant="outline" size="lg">
                Continue shopping
              </Button>
            </div>
            {addedMessage ? (
              <p
                className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-950"
                role="status"
              >
                Added {quantity} × {product.name} to your quote.{' '}
                <Link
                  to="/quote"
                  className="font-semibold underline decoration-amber-800/40 hover:text-amber-900"
                >
                  Review quote
                </Link>
                {' — '}we will confirm stock and delivery when you submit.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20 border-t border-slate-200 pt-12">
          <h2 className="text-2xl font-bold text-slate-900">
            More in this category
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
