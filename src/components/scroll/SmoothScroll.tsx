import { useEffect, useRef, useState, ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisContext } from './LenisContext'

gsap.registerPlugin(ScrollTrigger)

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Connect Lenis to GSAP ScrollTrigger
    instance.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      instance.raf(time * 1000)
    }
    rafRef.current = ticker

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    return () => {
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current)
      }
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
}
