import { useState, useEffect } from 'react'

export const useScrollVelocity = () => {
  const [velocity, setVelocity] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let lastTime = Date.now()
    let animationFrameId: number

    const updateVelocity = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const dt = currentTime - lastTime || 16

      const delta = currentScrollY - lastScrollY
      const currentVelocity = delta / dt

      // Smooth deceleration decay
      setVelocity((prev) => prev * 0.85 + currentVelocity * 0.15)

      lastScrollY = currentScrollY
      lastTime = currentTime
      animationFrameId = requestAnimationFrame(updateVelocity)
    }

    animationFrameId = requestAnimationFrame(updateVelocity)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return velocity
}
