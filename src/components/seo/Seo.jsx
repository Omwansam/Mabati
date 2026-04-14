import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Mabati Yetu'
const DEFAULT_DESCRIPTION =
  'Roofing materials supplier: corrugated sheets, stone-coated tiles, gutters, insulation, and fasteners. Request a quote online.'

function absoluteUrl(path) {
  const site = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''
  if (!site) return undefined
  const appBase = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  const pathWithBase = appBase ? `${appBase}${p}` : p
  return `${site}${pathWithBase}`
}

function resolveOgImage(ogImage) {
  if (!ogImage) return absoluteUrl('/images/og-default.svg')
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
  description = DEFAULT_DESCRIPTION,
  path = '',
  noindex = false,
  omitCanonical = false,
  ogImage,
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Roofing materials`
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
      <meta property="og:site_name" content={SITE_NAME} />
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
