import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { categories } from '../data/categories.js'
import { SITE_PHONE_E164 } from '../data/site.js'
import { useProducts } from '../hooks/useProducts.js'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { ProductGridSkeleton } from '../components/catalog/ProductGridSkeleton.jsx'
import { Button } from '../components/ui/Button.jsx'

export function HomePage() {
  const { loading, products, error } = useProducts()
  const featured = useMemo(
    () => products.filter((p) => p.featured).slice(0, 4),
    [products],
  )

  return (
    <div>
      <Seo
        title="Roofing materials & quotes"
        description="Corrugated sheets, tiles, gutters, insulation, and fasteners. Browse the Mabati Yetu catalogue and request a quote online."
        path="/"
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/40" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-300">
            Roofing materials
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Strong roofs start with{' '}
            <span className="text-amber-400">Mabati Yetu</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">
            Corrugated sheets, stone-coated tiles, gutters, insulation, and
            fasteners — sourced for durability and fair pricing. Browse the
            catalogue or talk to our team for quantities and delivery.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              as={Link}
              to="/catalog"
              variant="primary"
              size="lg"
              className="!bg-amber-500 !text-slate-900 hover:!bg-amber-400"
            >
              Browse products
            </Button>
            <Button
              as="a"
              href={`tel:${SITE_PHONE_E164}`}
              variant="outline"
              size="lg"
              className="!border-white !text-white hover:!bg-white/10"
            >
              Call us
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Shop by category</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Pick a line to see everything we stock in that range — filters and
            pricing update on the shop page.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                to={`/catalog/${cat.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-300 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {cat.name}
                  </h3>
                </div>
                <p className="flex-1 p-4 text-sm text-slate-600">
                  {cat.description}
                </p>
                <span className="px-4 pb-4 text-sm font-semibold text-amber-700 group-hover:text-amber-900">
                  View products →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Popular picks
              </h2>
              <p className="mt-2 text-slate-600">
                Best sellers and staff favourites this season.
              </p>
            </div>
            <Link
              to="/catalog"
              className="text-sm font-semibold text-amber-700 hover:text-amber-900"
            >
              View all products →
            </Link>
          </div>
          {error ? (
            <p className="mt-10 text-center text-red-600" role="alert">
              {error.message}
            </p>
          ) : null}
          {loading ? (
            <div className="mt-10">
              <ProductGridSkeleton count={4} />
            </div>
          ) : null}
          {!loading && !error ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </div>
  )
}
