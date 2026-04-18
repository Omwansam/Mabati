import { Link } from 'react-router-dom'
import {
  SITE_BRAND,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_E164,
  SITE_WEBSITE_URL,
} from '../../data/site.js'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-white">{SITE_BRAND}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed">
              Roofing sheets, tile profiles, fencing, fascia, mesh, and
              installation — Ruiru-based supply with delivery options countrywide.
              See the live site at{' '}
              <a
                href={SITE_WEBSITE_URL}
                className="text-amber-400 underline decoration-amber-400/40 hover:text-amber-300"
                target="_blank"
                rel="noreferrer"
              >
                ruirufactorymabati.com
              </a>
              .
            </p>
            <p className="mt-4">
              <a
                href={`tel:${SITE_PHONE_E164}`}
                className="text-lg font-semibold text-white hover:text-amber-400"
              >
                {SITE_PHONE_DISPLAY}
              </a>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              Shop
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/catalog"
                  className="hover:text-amber-400 focus:outline-none focus-visible:text-amber-400"
                >
                  Roofing materials
                </Link>
              </li>
              <li>
                <Link
                  to="/quote"
                  className="hover:text-amber-400 focus:outline-none focus-visible:text-amber-400"
                >
                  Free quotation
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/corrugated-sheets"
                  className="hover:text-amber-400 focus:outline-none focus-visible:text-amber-400"
                >
                  Corrugated &amp; box
                </Link>
              </li>
              <li>
                <Link
                  to="/catalog/roofing-tiles"
                  className="hover:text-amber-400 focus:outline-none focus-visible:text-amber-400"
                >
                  Stone-coated tiles
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick links
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-amber-400 focus:outline-none focus-visible:text-amber-400"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-amber-400 focus:outline-none focus-visible:text-amber-400"
                >
                  Contact &amp; delivery
                </Link>
              </li>
              <li>
                <a
                  href={SITE_WEBSITE_URL}
                  className="hover:text-amber-400 focus:outline-none focus-visible:text-amber-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  Official website
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Terms, privacy, and payment policies: confirm on the official site
              or WhatsApp.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-700 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {SITE_BRAND}. Prices as listed on the site;
          delivery and extras confirmed on WhatsApp or call.
        </div>
      </div>
    </footer>
  )
}
