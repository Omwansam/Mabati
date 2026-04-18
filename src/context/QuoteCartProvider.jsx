import { useCallback, useEffect, useMemo, useState } from 'react'
import { QuoteCartContext } from './quoteCartContext.js'

const STORAGE_KEY = 'mabati-yetu-quote'

function getLocalStorage() {
  try {
    if (typeof window === 'undefined') return null
    return window.localStorage
  } catch {
    return null
  }
}

function readStored() {
  try {
    const ls = getLocalStorage()
    if (!ls) return []
    const raw = ls.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    if (!data || !Array.isArray(data.items)) return []
    return data.items.filter(
      (i) =>
        i &&
        typeof i.productId === 'string' &&
        typeof i.quantity === 'number' &&
        i.quantity > 0,
    )
  } catch {
    return []
  }
}

function writeStored(items) {
  try {
    const ls = getLocalStorage()
    if (!ls) return
    ls.setItem(STORAGE_KEY, JSON.stringify({ items }))
  } catch {
    /* ignore quota */
  }
}

export function QuoteCartProvider({ children }) {
  const [items, setItems] = useState(() => readStored())

  useEffect(() => {
    writeStored(items)
  }, [items])

  const addItem = useCallback((product, quantity = 1) => {
    const q = Math.min(999, Math.max(1, Math.floor(quantity) || 1))
    setItems((prev) => {
      const idx = prev.findIndex((l) => l.productId === product.id)
      if (idx === -1) {
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            priceMax: product.priceMax,
            quantity: q,
            image: product.image,
            unit: product.unit,
          },
        ]
      }
      const next = [...prev]
      const merged = Math.min(999, next[idx].quantity + q)
      next[idx] = { ...next[idx], quantity: merged }
      return next
    })
  }, [])

  const setLineQuantity = useCallback((productId, quantity) => {
    const q = Math.min(999, Math.max(1, Math.floor(quantity) || 1))
    setItems((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, quantity: q } : l)),
    )
  }, [])

  const removeLine = useCallback((productId) => {
    setItems((prev) => prev.filter((l) => l.productId !== productId))
  }, [])

  const clearQuote = useCallback(() => {
    setItems([])
  }, [])

  const totalQuantity = useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items],
  )

  const subtotal = useMemo(
    () => items.reduce((sum, l) => sum + (l.price ?? 0) * l.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      setLineQuantity,
      removeLine,
      clearQuote,
      totalQuantity,
      subtotal,
    }),
    [
      items,
      addItem,
      setLineQuantity,
      removeLine,
      clearQuote,
      totalQuantity,
      subtotal,
    ],
  )

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  )
}
