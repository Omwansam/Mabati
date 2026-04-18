import { Link } from 'react-router-dom'
import { formatProductPrice } from '../../utils/formatPrice.js'
import { productImageUrl } from '../../utils/productImageUrl.js'

export function ProductCard({ product }) {
  const { name, image, slug, category, unit } = product
  const imgSrc = productImageUrl(image)
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-200 hover:shadow-md">
      <Link
        to={`/product/${slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-slate-100"
      >
        <img
          src={imgSrc}
          alt={name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-600 backdrop-blur-sm">
          {category.replace(/-/g, ' ')}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${slug}`}>
          <h3 className="text-base font-semibold text-slate-900 transition group-hover:text-amber-800">
            {name}
          </h3>
        </Link>
        <p className="mt-1 text-lg font-bold text-amber-700">
          {formatProductPrice(product)}
          {unit ? (
            <span className="ml-1 text-sm font-normal text-slate-500">
              {unit}
            </span>
          ) : null}
        </p>
        <div className="mt-4">
          <Link
            to={`/product/${slug}`}
            className="text-sm font-semibold text-amber-700 hover:text-amber-900"
          >
            View details →
          </Link>
        </div>
      </div>
    </article>
  )
}
