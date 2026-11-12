import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { Asterisk } from '@phosphor-icons/react'

const COPIES = 4

// An endless band of words that drifts on its own and speeds up (or reverses)
// with the scroll, so the page feels like it has momentum. Decorative: the same
// words are announced once to screen readers through `label`.
export default function Marquee({ items, label, baseSpeed = 3 }) {
  const reduceMotion = useReducedMotion()
  const offset = useMotionValue(0)
  const direction = useRef(-1)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false })

  // Each copy is 100 / COPIES percent of the track, so wrapping at that width is seamless.
  const x = useTransform(offset, (value) => `${-(((value % 100) + 100) % 100) / COPIES}%`)

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    const push = boost.get()
    if (push < 0) direction.current = 1
    else if (push > 0) direction.current = -1
    const step = (baseSpeed + Math.abs(push) * baseSpeed) * (delta / 1000)
    offset.set(offset.get() - direction.current * step)
  })

  return (
    <div role="img" aria-label={label} className="overflow-hidden">
      <motion.div aria-hidden="true" style={{ x }} className="flex w-max will-change-transform">
        {Array.from({ length: COPIES }, (_, copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <span className="px-5 font-display text-[clamp(2rem,5.5vw,4.5rem)] font-semibold tracking-[-0.04em] whitespace-nowrap sm:px-8">
                  {item}
                </span>
                <Asterisk weight="bold" className="size-[clamp(1.25rem,2.6vw,2.25rem)] shrink-0" />
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  )
}
