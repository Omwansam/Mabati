import { Link } from 'react-router-dom'
import { Seo } from '../components/seo/Seo.jsx'
import { Button } from '../components/ui/Button.jsx'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <Seo
        title="Page not found"
        description="The page you requested does not exist on Ruiru Mabati."
        noindex
        omitCanonical
      />
      <p className="text-6xl font-black text-amber-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        That URL does not match any page on Ruiru Mabati.
      </p>
      <Button as={Link} to="/" variant="primary" className="mt-8" size="lg">
        Back to home
      </Button>
    </div>
  )
}
