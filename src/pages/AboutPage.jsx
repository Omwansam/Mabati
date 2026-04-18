import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { Button } from '../components/ui/Button.jsx'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Seo
        title="About us"
        description="Ruiru Mabati supplies roofing sheets, tile profiles, fencing, fascia, and installation from Ruiru with delivery across Kenya."
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
        About Ruiru Mabati
      </h1>
      <p className="mt-4 text-lg text-slate-600">
        We are a Ruiru-based roofing supplier focused on clear pricing and real
        product photography. From corrugated and box profiles to stone-coated
        lines, fencing, fascia, reinforcement mesh, and installation — browse the
        site, build a list, and send it on WhatsApp for stock and delivery.
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-slate-700">
        <p>
          We help you match profile, colour, and budget — whether you are roofing
          a home, warehouse, or farm structure. Delivery and flexible payment
          options are discussed when you message us.
        </p>
        <p>
          Use the catalogue to shortlist products, add them to your quote, and open
          WhatsApp with your full list — we follow up with availability and
          delivery options.
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
