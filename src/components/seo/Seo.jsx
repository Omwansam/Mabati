import { Helmet } from 'react-helmet-async'
import {
  SITE_BRAND,
  DEFAULT_SEO_DESCRIPTION,
  SITE_OG_FALLBACK_IMAGE,
} from '../../data/site.js'

function absoluteUrl(path) {
  const site = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''
  if (!site) return undefined
  const appBase = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  const pathWithBase = appBase ? `${appBase}${p}` : p
  return `${site}${pathWithBase}`
}

function resolveOgImage(ogImage) {
  if (!ogImage) return absoluteUrl(SITE_OG_FALLBACK_IMAGE)
  if (/^https?:\/\//i.test(ogImage)) return ogImage
  const p = ogImage.startsWith('/') ? ogImage : `/${ogImage}`
  return absoluteUrl(p)
}

/**
 * @param {{
 *   title?: string
 *   description?: string
 *   path?: string
 *   noindex?: boolean
 *   omitCanonical?: boolean
 *   ogImage?: string
 * }} props
 */
export function Seo({
  title,
  description = DEFAULT_SEO_DESCRIPTION,
  path = '',
  noindex = false,
  omitCanonical = false,
  ogImage,
}) {
  const pageTitle = title
    ? `${title} | ${SITE_BRAND}`
    : `${SITE_BRAND} — Roofing materials`
  const canonical =
    omitCanonical || path === '' ? undefined : absoluteUrl(path)
  const ogUrl = canonical
  const image = resolveOgImage(ogImage)

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noindex ? <meta name="robots" content="noindex" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_BRAND} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      {ogUrl ? <meta property="og:url" content={ogUrl} /> : null}
      {image ? <meta property="og:image" content={image} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
    </Helmet>
  )
}
