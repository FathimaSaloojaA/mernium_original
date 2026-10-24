import { useEffect, useState, createContext, useContext, ReactNode } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface CursorContextType {
  setCursorText: (text: string) => void
  setCursorVariant: (variant: 'default' | 'hover' | 'drag' | 'button' | 'hidden') => void
}

const CursorContext = createContext<CursorContextType>({
  setCursorText: () => {},
  setCursorVariant: () => {},
})

export const useCursor = () => useContext(CursorContext)

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'drag' | 'button' | 'hidden'>('default')
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null

      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor')
        const text = cursorTarget.getAttribute('data-cursor-text') || ''
        
        if (type === 'explore') setCursorVariant('hover')
        else if (type === 'drag') setCursorVariant('drag')
        else if (type === 'button') setCursorVariant('button')
        else setCursorVariant('hover')

        setCursorText(text)
      } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setCursorVariant('hover')
        setCursorText('')
      } else {
        setCursorVariant('default')
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', moveMouse)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (isTouch) return <CursorContext.Provider value={{ setCursorText, setCursorVariant }}>{children}</CursorContext.Provider>

  const variants = {
    default: {
      height: 14,
      width: 14,
      backgroundColor: '#71D5D9',
      border: '1px solid rgba(113, 213, 217, 0.8)',
      boxShadow: '0 0 15px rgba(113, 213, 217, 0.6)',
    },
    hover: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(113, 213, 217, 0.15)',
      border: '1.5px solid #71D5D9',
      boxShadow: '0 0 30px rgba(113, 213, 217, 0.4)',
    },
    button: {
      height: 50,
      width: 50,
      backgroundColor: 'rgba(89, 172, 183, 0.25)',
      border: '1.5px solid #59ACB7',
      boxShadow: '0 0 30px rgba(89, 172, 183, 0.5)',
    },
    drag: {
      height: 84,
      width: 84,
      backgroundColor: 'rgba(10, 19, 25, 0.9)',
      border: '2px solid #71D5D9',
      boxShadow: '0 0 45px rgba(113, 213, 217, 0.5)',
    },
    hidden: {
      height: 0,
      width: 0,
      opacity: 0,
    },
  }

  return (
    <CursorContext.Provider value={{ setCursorText, setCursorVariant }}>
      {children}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-[2px] transition-colors duration-300"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', damping: 28, stiffness: 350 }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-acid text-center px-1 animate-pulse">
            {cursorText}
          </span>
        )}
      </motion.div>
    </CursorContext.Provider>
  )
}
