import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '../data/site.js'
import { getWhatsAppUrl } from '../utils/whatsappUrl.js'
import { Button } from '../components/ui/Button.jsx'

export function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Seo
        title="Contact"
        description="Phone, WhatsApp, and hours for Ruiru Mabati. Request a quote via WhatsApp or call our team."
        path="/contact"
      />
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-amber-700">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-slate-800">Contact</span>
      </nav>

      <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
        Contact
      </h1>
      <p className="mt-4 text-slate-600">
        Reach the team for technical questions, bulk pricing, or site delivery.
      </p>

      <dl className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <dt className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            Email
          </dt>
          <dd className="mt-1">
            <a
              href="mailto:sales@ruirufactorymabati.com"
              className="text-slate-900 hover:text-amber-700"
            >
              sales@ruirufactorymabati.com
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            Phone
          </dt>
          <dd className="mt-1">
            <a
              href={`tel:${SITE_PHONE_E164}`}
              className="text-slate-900 hover:text-amber-700"
            >
              {SITE_PHONE_DISPLAY}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            WhatsApp
          </dt>
          <dd className="mt-1">
            <a
              href={getWhatsAppUrl(
                'Hello, I am reaching out from the Ruiru Mabati website contact page.',
              )}
              className="text-slate-900 hover:text-amber-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            Hours
          </dt>
          <dd className="mt-1 text-slate-700">Monday – Saturday · 8:00 – 17:30</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold uppercase tracking-wide text-amber-800">
            Yard
          </dt>
          <dd className="mt-1 text-slate-700">
            Demo address — update with your branch or pickup point.
          </dd>
        </div>
      </dl>

      <p className="mt-8 text-sm text-slate-500">
        Prefer a list first? Add products in the shop, then open the quote page
        to send everything on WhatsApp in one message.
      </p>
      <Button as={Link} to="/quote" variant="secondary" className="mt-4">
        Open quote
      </Button>
    </div>
  )
}
