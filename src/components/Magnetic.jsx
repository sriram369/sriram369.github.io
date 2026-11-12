import { motion, useMotionValue, useSpring } from 'motion/react'

// Pulls its child a little toward the cursor, then springs back. Mouse only:
// touch and pen pointers are ignored, and reduced motion disables the springs.
export default function Magnetic({ strength = 0.3, className, children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-flex ${className ?? ''}`}
    >
      {children}
    </motion.span>
  )
}
