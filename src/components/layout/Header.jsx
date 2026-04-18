import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import {
  SITE_BRAND,
  SITE_LOGO_MARK,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_E164,
} from '../../data/site.js'
import { useQuoteCart } from '../../hooks/useQuoteCart.js'

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-amber-100 text-amber-900'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

function SiteSearch() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const onCatalog = location.pathname.startsWith('/catalog')
  const urlQ = searchParams.get('q') ?? ''
  const [value, setValue] = useState(urlQ)

  useEffect(() => {
    setValue(urlQ)
  }, [urlQ])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (onCatalog) {
      const next = new URLSearchParams(searchParams)
      if (trimmed) next.set('q', trimmed)
      else next.delete('q')
      setSearchParams(next, { replace: true })
    } else {
      navigate(
        trimmed
          ? {
              pathname: '/catalog',
              search: `?q=${encodeURIComponent(trimmed)}`,
            }
          : '/catalog',
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hidden min-w-0 flex-1 md:mx-4 md:block md:max-w-md"
      role="search"
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-search"
        type="search"
        name="q"
        placeholder="Search products…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
      />
    </form>
  )
}

function QuoteLink({ className, onClick }) {
  const { totalQuantity } = useQuoteCart()
  return (
    <Link
      to="/quote"
      className={`relative inline-flex items-center gap-1.5 ${className}`}
      onClick={onClick}
    >
      <span>Quote</span>
      {totalQuantity > 0 ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-600 px-1 text-xs font-bold text-white">
          {totalQuantity > 99 ? '99+' : totalQuantity}
        </span>
      ) : null}
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-slate-900"
          onClick={() => setOpen(false)}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-600 text-sm font-extrabold text-white"
            aria-hidden
          >
            {SITE_LOGO_MARK}
          </span>
          <span className="max-w-[11rem] truncate text-base font-bold sm:max-w-none sm:text-lg">
            {SITE_BRAND}
          </span>
        </Link>

        <SiteSearch />

        <nav
          className="hidden shrink-0 items-center gap-1 lg:flex"
          aria-label="Main"
        >
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/catalog" className={navLinkClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <QuoteLink
            className="rounded-lg px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50"
          />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            href={`tel:${SITE_PHONE_E164}`}
            className="hidden text-sm font-semibold text-slate-800 hover:text-amber-800 xl:inline"
          >
            {SITE_PHONE_DISPLAY}
          </a>
          <QuoteLink
            className="rounded-lg px-2 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-50 lg:hidden"
          />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 p-2 text-slate-700 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
        >
          <form
            className="mb-4"
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.target)
              const q = String(fd.get('mobile-q') ?? '').trim()
              setOpen(false)
              navigate(
                q
                  ? {
                      pathname: '/catalog',
                      search: `?q=${encodeURIComponent(q)}`,
                    }
                  : '/catalog',
              )
            }}
          >
            <label htmlFor="mobile-site-search" className="sr-only">
              Search products
            </label>
            <input
              id="mobile-site-search"
              type="search"
              name="mobile-q"
              placeholder="Search products…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white"
            >
              Search
            </button>
          </form>
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            <NavLink
              to="/"
              className={navLinkClass}
              end
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>
            <Link
              to="/quote"
              className="mt-2 rounded-lg bg-amber-600 px-3 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              View quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
