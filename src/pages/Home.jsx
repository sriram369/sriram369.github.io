import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowRight, ArrowUpRight, DownloadSimple } from '@phosphor-icons/react'
import { buildWords, journey, now, profile, stack, stats } from '../data/site'
import { projects } from '../data/projects'
import { EASE } from '../lib/motion'
import { Container, OrgLogo, Reveal, TextLink } from '../components/ui'
import Magnetic from '../components/Magnetic'
import Marquee from '../components/Marquee'
import CountUp from '../components/CountUp'

const featured = projects.filter((project) => project.featured)

/* ---------- Hero ---------- */

// Words rise out of a clipped line one after another, like a title card.
function RisingWords({ text, delay = 0 }) {
  return text.split(' ').map((word, index) => (
    <span key={index} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: delay + index * 0.07, ease: EASE }}
        className="inline-block"
      >
        {word}
        {' '}
      </motion.span>
    </span>
  ))
}

function RotatingWord() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const timer = setInterval(() => setIndex((current) => (current + 1) % buildWords.length), 2400)
    return () => clearInterval(timer)
  }, [reduceMotion])

  return (
    <span className="relative inline-flex overflow-hidden rounded-[0.14em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={buildWords[index]}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mark m-0 inline-block whitespace-nowrap"
        >
          {buildWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Portrait({ constraints }) {
  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0.18}
      dragSnapToOrigin
      whileDrag={{ scale: 1.04, rotate: 0 }}
      whileHover={{ rotate: 1.5 }}
      initial={{ opacity: 0, scale: 0.9, rotate: 10, y: 30 }}
      animate={{ opacity: 1, scale: 1, rotate: 4, y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.25 }}
      className="relative z-10 w-[min(62vw,250px)] cursor-grab touch-none select-none active:cursor-grabbing sm:w-[280px] lg:absolute lg:top-[112px] lg:right-14 lg:w-[clamp(250px,23vw,330px)]"
    >
      <div aria-hidden="true" className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-panel bg-accent" />
      <img
        src="/img/sriram.webp"
        alt="Sriram in his Johns Hopkins graduation gown, crouching beside a flower garden and pond"
        width={724}
        height={1086}
        fetchPriority="high"
        draggable={false}
        className="relative aspect-[4/5] w-full rounded-panel object-cover object-[50%_42%] shadow-panel"
      />
    </motion.div>
  )
}

function Hero() {
  const sectionRef = useRef(null)
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const smoothX = useSpring(spotX, { stiffness: 90, damping: 20 })
  const smoothY = useSpring(spotY, { stiffness: 90, damping: 20 })
  const spotXCss = useMotionTemplate`${smoothX}px`
  const spotYCss = useMotionTemplate`${smoothY}px`
  const [tracking, setTracking] = useState(false)

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    spotX.set(event.clientX - rect.left)
    spotY.set(event.clientY - rect.top)
    if (!tracking) setTracking(true)
  }

  return (
    <section ref={sectionRef} onPointerMove={onPointerMove} className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={tracking ? { '--spot-x': spotXCss, '--spot-y': spotYCss } : undefined}
        className="dot-grid pointer-events-none absolute inset-0"
      />

      <Container className="relative flex min-h-[100dvh] flex-col justify-end gap-8 pt-[96px] pb-10 lg:pb-14">
        <Portrait constraints={sectionRef} />

        <div>
          <h1 id="page-title" tabIndex={-1} className="font-semibold lowercase outline-none">
            <span className="sr-only">Hi, I'm Sriram. I love building AI agents.</span>
            <span aria-hidden="true" className="block text-[clamp(3.25rem,11.4vw,10.5rem)] leading-[0.9] tracking-[-0.055em]">
              <RisingWords text="Hi, I'm Sriram." delay={0.05} />
            </span>
          </h1>

          <div className="mt-6 grid items-end gap-8 lg:mt-8 lg:grid-cols-12">
            <motion.p
              aria-hidden="true"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="font-display text-[clamp(1.75rem,4.3vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.04em] lowercase lg:col-span-7"
            >
              <span className="block">I love building</span>
              <RotatingWord />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="lg:col-span-5"
            >
              <p className="max-w-[40ch] text-lg leading-relaxed text-muted lowercase">
                A product-minded engineer in NYC, working at the intersection of product, AI, and software engineering.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Magnetic>
                  <a href="#projects" className="btn btn-primary group">
                    Projects
                    <ArrowRight
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={profile.resume} download="Sriram_Resume.pdf" className="btn btn-ghost">
                    <DownloadSimple size={16} aria-hidden="true" />
                    Resume
                  </a>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------- Now ---------- */

function Now() {
  return (
    <Container as="section" aria-label="Current role and education">
      <ul className="grid gap-x-8 border-t border-line sm:grid-cols-3">
        {now.map((item, index) => (
          <Reveal as="li" key={item.org} delay={index * 0.08} className="flex items-center gap-4 border-b border-line py-6 sm:border-b-0">
            <OrgLogo src={item.logo} size={40} className="rounded-xl" />
            <div className="min-w-0">
              <p className="meta">{item.note}</p>
              <p className="mt-1 text-[0.9375rem] leading-snug">
                {item.line} at{' '}
                <TextLink href={item.href} arrow={false}>
                  {item.org}
                </TextLink>
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Container>
  )
}

/* ---------- Stack marquee ---------- */

function StackBand() {
  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <div className="tone-accent -mx-6 -rotate-2 py-5 sm:py-7">
        <Marquee items={stack} label={`Tools I build with: ${stack.join(', ')}`} />
      </div>
    </section>
  )
}

/* ---------- Numbers ---------- */

const statLayout = {
  workflow: 'tone-accent sm:col-span-2 lg:col-span-6 lg:row-span-2',
  aurapath: 'bg-surface border border-line sm:col-span-2 lg:col-span-6',
  community: 'tone-invert lg:col-span-3',
  openclaw: 'bg-surface border border-line lg:col-span-3',
}

function Numbers() {
  return (
    <Container as="section" aria-labelledby="numbers">
      <Reveal>
        <h2 id="numbers" className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          By the numbers
        </h2>
      </Reveal>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
        {stats.map((stat, index) => {
          const lead = stat.id === 'workflow'
          return (
            <Reveal
              as="li"
              key={stat.id}
              delay={index * 0.07}
              className={`flex flex-col justify-between gap-8 rounded-panel p-6 sm:p-8 ${statLayout[stat.id]}`}
            >
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className={`block font-display font-semibold leading-[0.85] tracking-[-0.06em] ${
                  lead ? 'text-[clamp(5.5rem,17vw,13rem)]' : 'text-[clamp(3.25rem,5.4vw,4.75rem)]'
                }`}
              />
              <div>
                <p className={`max-w-[38ch] leading-snug ${lead ? 'text-xl font-medium sm:text-2xl' : 'text-[1.0625rem] text-muted'}`}>
                  {stat.text}
                </p>
                {stat.href && (
                  <a href={stat.href} className="btn btn-primary group mt-6">
                    {stat.cta}
                    <ArrowRight
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
              </div>
            </Reveal>
          )
        })}
      </ul>
    </Container>
  )
}

/* ---------- Project deck ---------- */

const deckTones = ['bg-surface border border-line', 'tone-accent', 'tone-invert']

function DeckCard({ project, index, total, progress }) {
  // Earlier cards shrink a little as later ones slide over them, so the pile reads as depth.
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.045])
  const demo = project.links.find((link) => link.kind === 'demo')

  return (
    <div className="stack-card" style={{ '--stack-index': index }}>
      <motion.article
        style={{ scale }}
        className={`grid origin-top overflow-hidden rounded-panel shadow-panel lg:h-[min(66vh,540px)] lg:grid-cols-2 ${deckTones[index % deckTones.length]}`}
      >
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-9 lg:p-11">
          <div>
            <p className="meta">{project.origin}</p>
            <h3 className="mt-3 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.045em]">{project.title}</h3>
            <p className="mt-4 max-w-[34ch] text-lg leading-snug text-muted sm:text-xl">{project.tagline}</p>
          </div>
          <div>
            <ul className="flex flex-wrap gap-2" aria-label="Built with">
              {project.tech.slice(0, 4).map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`#projects/${project.id}`} className="btn btn-primary group">
                Details
                <span className="sr-only"> about {project.title}</span>
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
              {demo && (
                <a href={demo.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  Live demo
                  <span className="sr-only"> of {project.title} (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="group order-first aspect-[16/10] overflow-hidden bg-sunken lg:order-none lg:aspect-auto">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={1280}
            height={800}
            loading="lazy"
            className="size-full object-cover object-left-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
      </motion.article>
    </div>
  )
}

function ProjectDeck() {
  const deckRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: deckRef, offset: ['start start', 'end end'] })

  return (
    <Container as="section" className="pt-24 sm:pt-36" aria-labelledby="selected-projects">
      <Reveal className="flex items-end justify-between gap-6">
        <h2 id="selected-projects" className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Selected projects
        </h2>
        <a href="#projects" className="link shrink-0 pb-1 text-[0.9375rem] font-medium">
          All {projects.length} projects
        </a>
      </Reveal>
      <div ref={deckRef} className="mt-10 grid gap-6 lg:gap-10">
        {featured.map((project, index) => (
          <DeckCard key={project.id} project={project} index={index} total={featured.length} progress={scrollYProgress} />
        ))}
      </div>
    </Container>
  )
}

/* ---------- Journey ---------- */

function Stop({ stop, index, total, progress }) {
  const at = index / (total - 1)
  const lit = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1])

  return (
    <li className="relative pb-9 pl-9 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-10">
      <span className="absolute top-1 left-0 size-4 rounded-full border-2 border-line bg-bg lg:top-0">
        <motion.span style={{ opacity: lit, scale: lit }} className="absolute -inset-0.5 rounded-full bg-accent" />
      </span>
      {/* Only the dot and line animate. The text stays at full contrast at every scroll position. */}
      <div>
        <p className="font-display text-xl font-semibold leading-tight tracking-[-0.025em] lg:text-[1.375rem]">
          {stop.current ? <span className="mark">{stop.city}</span> : stop.city}
        </p>
        <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted">{stop.note}</p>
      </div>
    </li>
  )
}

function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <Container as="section" className="pt-24 sm:pt-36" aria-labelledby="journey">
      <Reveal>
        <h2 id="journey" className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          How I got here
        </h2>
      </Reveal>
      <div ref={ref} className="relative mt-12">
        {/* The line draws as you scroll: down the side on phones, across on wide screens. */}
        <div aria-hidden="true" className="absolute top-1 bottom-1 left-[7px] w-[2px] bg-line lg:top-[7px] lg:bottom-auto lg:left-0 lg:h-[2px] lg:w-[calc(83.333%+28px)]" />
        <motion.div aria-hidden="true" style={{ scaleY: progress }} className="absolute top-1 bottom-1 left-[7px] w-[2px] origin-top bg-accent lg:hidden" />
        <motion.div aria-hidden="true" style={{ scaleX: progress }} className="absolute top-[7px] left-0 hidden h-[2px] w-[calc(83.333%+28px)] origin-left bg-accent lg:block" />
        <ol className="relative lg:grid lg:grid-cols-6 lg:gap-6">
          {journey.map((stop, index) => (
            <Stop key={stop.city} stop={stop} index={index} total={journey.length} progress={progress} />
          ))}
        </ol>
      </div>
    </Container>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Now />
      <StackBand />
      <Numbers />
      <ProjectDeck />
      <Journey />
    </>
  )
}
