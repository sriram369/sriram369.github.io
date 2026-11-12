import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

// Counts from zero to `value` the first time it scrolls into view. The final
// figure is in the markup from the start, so it reads correctly without motion
// and for screen readers.
export default function CountUp({ value, prefix = '', suffix = '', className }) {
  const ref = useRef(null)
  const numberRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = numberRef.current
    if (!inView || reduceMotion || !node) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = Math.round(latest)
      },
    })
    return () => {
      controls.stop()
      node.textContent = value
    }
  }, [inView, reduceMotion, value])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        <span ref={numberRef}>{value}</span>
        {suffix}
      </span>
    </span>
  )
}
