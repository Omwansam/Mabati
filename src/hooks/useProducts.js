import { useEffect, useState } from 'react'

/**
 * Loads product catalogue asynchronously so initial render can show loading state.
 */
export function useProducts() {
  const [state, setState] = useState({
    loading: true,
    products: /** @type {import('../data/products.js').Product[]} */ ([]),
    error: /** @type {Error | null} */ (null),
  })

  useEffect(() => {
    let cancelled = false
    import('../data/products.js')
      .then((mod) => {
        if (!cancelled) {
          setState({ loading: false, products: mod.products, error: null })
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState((s) => ({
            ...s,
            loading: false,
            error: err instanceof Error ? err : new Error(String(err)),
          }))
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
