import { useMemo, useState } from 'react'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { categories, getCategoryBySlug } from '../data/categories.js'
import { useProducts } from '../hooks/useProducts.js'
import { filterProducts } from '../utils/filterProducts.js'
import { sortProducts } from '../utils/sortProducts.js'
import { ProductCard } from '../components/product/ProductCard.jsx'
import { ProductGridSkeleton } from '../components/catalog/ProductGridSkeleton.jsx'
import { Select } from '../components/ui/Select.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'

const PRICE_OPTIONS = [
  { value: 'any', min: null, max: null, label: 'Any price' },
  { value: 'under-1000', min: null, max: 999, label: 'Under KES 1,000' },
  {
    value: '1000-5000',
    min: 1000,
    max: 5000,
    label: 'KES 1,000 – 5,000',
  },
  {
    value: '5000-15000',
    min: 5001,
    max: 15000,
    label: 'KES 5,001 – 15,000',
  },
  { value: 'over-15000', min: 15001, max: null, label: 'Over KES 15,000' },
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Default sorting' },
  { value: 'popularity', label: 'Sort by popularity' },
  { value: 'latest', label: 'Sort by latest' },
  { value: 'price-asc', label: 'Sort by price: low to high' },
  { value: 'price-desc', label: 'Sort by price: high to low' },
  { value: 'name', label: 'Name A–Z' },
]

export function CatalogPage() {
  const { categorySlug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { loading, products, error } = useProducts()
  const [priceKey, setPriceKey] = useState('any')

  const q = searchParams.get('q') ?? ''
  const sort = searchParams.get('sort') ?? 'default'

  const unknownSlug =
    categorySlug != null && getCategoryBySlug(categorySlug) == null
  const meta =
    categorySlug && !unknownSlug ? getCategoryBySlug(categorySlug) : null
  const category = unknownSlug ? 'all' : (categorySlug ?? 'all')

  const priceBand = useMemo(
    () => PRICE_OPTIONS.find((p) => p.value === priceKey) ?? PRICE_OPTIONS[0],
    [priceKey],
  )

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        categorySlug: category === 'all' ? undefined : category,
        minPrice: priceBand.min ?? undefined,
        maxPrice: priceBand.max ?? undefined,
        searchQuery: q,
      }),
    [products, category, priceBand.min, priceBand.max, q],
  )

  const sorted = useMemo(
    () => sortProducts(filtered, sort),
    [filtered, sort],
  )

  function setQuery(nextQ) {
    const next = new URLSearchParams(searchParams)
    const trimmed = nextQ.trim()
    if (trimmed) next.set('q', trimmed)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  function setSortParam(nextSort) {
    const next = new URLSearchParams(searchParams)
    if (nextSort && nextSort !== 'default') next.set('sort', nextSort)
    else next.delete('sort')
    setSearchParams(next, { replace: true })
  }

  function onCategoryChange(e) {
    const value = e.target.value
    if (value === 'all') navigate('/catalog')
    else navigate(`/catalog/${value}`)
  }

  function resetFilters() {
    setPriceKey('any')
    navigate({ pathname: '/catalog', search: '' }, { replace: true })
  }

  if (unknownSlug) {
    return <Navigate to="/catalog" replace />
  }

  const seoTitle = meta ? meta.name : 'Shop'
  const seoDescription = meta
    ? `${meta.description} Filter, sort, and request a quote on Mabati Yetu.`
    : 'Roofing materials: corrugated and box profiles, stone-coated tiles, insulation, accessories, and fasteners. Filter, search, and sort like a factory catalogue.'

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={location.pathname}
      />
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-amber-700">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-slate-800">Shop</span>
        {meta ? (
          <>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-slate-800">{meta.name}</span>
          </>
        ) : null}
      </nav>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            {meta ? meta.name : 'All products'}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            {meta
              ? meta.description
              : 'Search, filter by category and price, and sort results. Open any product for a detailed quote.'}
          </p>
        </div>
        {meta ? (
          <Button as={Link} to="/catalog" variant="outline" size="sm">
            View all categories
          </Button>
        ) : null}
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 sm:col-span-2">
            <Input
              label="Search"
              type="search"
              name="catalog-search"
              value={q}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, description, category…"
              autoComplete="off"
            />
          </div>
          <div className="min-w-[160px]">
            <Select
              label="Category"
              value={category}
              onChange={onCategoryChange}
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="min-w-[160px]">
            <Select
              label="Price band"
              value={priceKey}
              onChange={(e) => setPriceKey(e.target.value)}
            >
              {PRICE_OPTIONS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="min-w-[160px] sm:col-span-2 lg:col-span-1">
            <Select
              label="Sort"
              value={sort}
              onChange={(e) => setSortParam(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {!error && !loading && sorted.length > 0 ? (
        <p className="mt-6 text-sm text-slate-600">
          Showing all {sorted.length}{' '}
          {sorted.length === 1 ? 'result' : 'results'}
        </p>
      ) : null}

      {error ? (
        <div
          className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
          role="alert"
        >
          <p className="font-semibold text-red-800">Something went wrong</p>
          <p className="mt-2 text-sm text-red-700">{error.message}</p>
        </div>
      ) : null}

      {!error && loading ? (
        <div className="mt-10">
          <ProductGridSkeleton count={8} />
        </div>
      ) : null}

      {!error && !loading && sorted.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-slate-800">
            {q.trim()
              ? 'No products match your search'
              : 'No products match your filters'}
          </p>
          <p className="mt-2 text-slate-600">
            Try different keywords, a wider price band, or another category.
          </p>
          <Button variant="primary" className="mt-6" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      ) : null}

      {!error && !loading && sorted.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
