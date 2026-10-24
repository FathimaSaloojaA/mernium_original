import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../scroll/LenisContext'

/**
 * ScrollToTop
 *
 * Resets scroll position to the top whenever the route pathname changes.
 * Works with Lenis smooth scroll: calls lenis.scrollTo(0, { immediate: true })
 * so Lenis's internal state is also reset, not just the native window scroll.
 *
 * Falls back to window.scrollTo if Lenis is not yet initialised.
 *
 * Mount this component once, directly inside <Router>, so it has access to
 * the routing context. It renders nothing.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation()
  const { lenis } = useLenis()

  useEffect(() => {
    if (lenis) {
      // Tell Lenis to jump to the top immediately (no animation)
      lenis.scrollTo(0, { immediate: true })
    } else {
      // Fallback: native scroll reset before Lenis initialises
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, lenis])

  return null
}
