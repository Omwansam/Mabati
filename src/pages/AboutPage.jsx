import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { Button } from '../components/ui/Button.jsx'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Seo
        title="About us"
        description="Learn how Mabati Yetu supplies corrugated sheets, tiles, gutters, and fixings for East African projects."
        path="/about"
      />
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-amber-700">
          Home
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-slate-800">About</span>
      </nav>

      <h1 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl">
        About Mabati Yetu Factory
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        Factory-direct roofing materials — from corrugated and box profiles to
        stone-coated lines, insulation, and accessories — structured like the
        public{' '}
        <a
          href="https://www.mabatiyetu.co.ke/product-category/roofing-materials/"
          className="font-medium text-amber-800 underline decoration-amber-300 hover:text-amber-950"
          target="_blank"
          rel="noreferrer"
        >
          roofing materials
        </a>{' '}
        catalogue.
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-slate-700">
        <p>
          We help you match profile, gauge, colour, and budget — whether you are
          roofing a home, warehouse, or farm structure. Delivery and flexible
          payment options are discussed when you request a quote.
        </p>
        <p>
          Our team can advise on overlap, screw spacing, and compatible ridges
          and valleys. Use the online catalogue to shortlist products, add them
          to your quote, and send us your list — we will follow up with stock
          checks and delivery options.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Button as={Link} to="/catalog" variant="primary" size="lg">
          View catalogue
        </Button>
        <Button as={Link} to="/contact" variant="outline" size="lg">
          Contact us
        </Button>
      </div>
    </div>
  )
}
