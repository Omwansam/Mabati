import { useContext } from 'react'
import { QuoteCartContext } from '../context/quoteCartContext.js'

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext)
  if (!ctx) {
    throw new Error('useQuoteCart must be used within QuoteCartProvider')
  }
  return ctx
}
