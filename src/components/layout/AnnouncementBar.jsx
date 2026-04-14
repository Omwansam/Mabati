import { PROMO_ITEMS, SITE_PHONE_DISPLAY, SITE_PHONE_E164 } from '../../data/site.js'

export function AnnouncementBar() {
  return (
    <div className="bg-slate-900 px-4 py-2 text-center text-xs text-slate-200 sm:text-sm">
      <div className="mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-center gap-x-6 gap-y-1 sm:flex-row sm:justify-between">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {PROMO_ITEMS.map((item) => (
            <span
              key={item.label}
              className={
                item.highlight
                  ? 'font-semibold text-amber-400'
                  : 'text-slate-300'
              }
            >
              {item.label}
            </span>
          ))}
        </p>
        <a
          href={`tel:${SITE_PHONE_E164.replace(/\s/g, '')}`}
          className="shrink-0 font-semibold text-white hover:text-amber-400"
        >
          Call {SITE_PHONE_DISPLAY}
        </a>
      </div>
    </div>
  )
}
