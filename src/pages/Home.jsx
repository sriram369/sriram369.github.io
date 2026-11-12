import { motion } from 'motion/react'
import { ArrowRight, DownloadSimple } from '@phosphor-icons/react'
import { now, profile } from '../data/site'
import { projects } from '../data/projects'
import { Container, OrgLogo, Reveal, TextLink } from '../components/ui'
import { EASE } from '../lib/motion'

const featured = projects.filter((project) => project.featured)

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
})

function Hero() {
  return (
    <Container
      as="section"
      className="grid items-center gap-12 pt-[104px] pb-16 lg:min-h-[min(100dvh,820px)] lg:grid-cols-12 lg:gap-8 lg:pt-[120px] lg:pb-20"
    >
      <div className="lg:col-span-7">
        <motion.h1
          id="page-title"
          tabIndex={-1}
          {...rise(0.05)}
          className="text-[clamp(2.5rem,5.1vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em] lowercase outline-none"
        >
          Hi, I'm Sriram. I love building <span className="mark">AI agents.</span>
        </motion.h1>
        <motion.p {...rise(0.15)} className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted lowercase sm:text-xl">
          A product-minded engineer in NYC, working at the intersection of product, AI, and software engineering.
        </motion.p>
        <motion.div {...rise(0.25)} className="mt-9 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary group">
            Projects
            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
          <a href={profile.resume} download="Sriram_Resume.pdf" className="btn btn-ghost">
            <DownloadSimple size={16} aria-hidden="true" />
            Resume
          </a>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[380px] lg:col-span-5 lg:mr-0 lg:max-w-[420px]">
        <div className="relative">
          {/* The marigold slab slides out from behind the portrait once it has landed. */}
          <motion.div
            aria-hidden="true"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: 16, y: 16, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="absolute inset-0 rounded-panel bg-accent"
          />
          <motion.img
            src="/img/sriram.webp"
            alt="Sriram in his Johns Hopkins graduation gown, crouching beside a flower garden and pond"
            width={724}
            height={1086}
            fetchPriority="high"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="relative aspect-[4/5] w-full rounded-panel object-cover object-[50%_42%]"
          />
        </div>
      </div>
    </Container>
  )
}

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

function ProjectTile({ project, large = false }) {
  return (
    <a
      href={`#projects/${project.id}`}
      className={`group flex flex-col overflow-hidden rounded-panel border border-line bg-surface transition-colors duration-300 hover:border-ink ${
        large ? 'h-full' : ''
      }`}
    >
      <div className={`overflow-hidden bg-sunken ${large ? 'min-h-[240px] flex-1' : 'aspect-[16/9]'}`}>
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width={1280}
          height={800}
          loading="lazy"
          className="size-full object-cover object-left-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-end justify-between gap-4 p-5 sm:p-6">
        <div className="min-w-0">
          <h3 className={`font-semibold tracking-[-0.02em] ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{project.title}</h3>
          <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted">{project.tagline}</p>
        </div>
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}

function SelectedProjects() {
  const [lead, ...rest] = featured
  return (
    <Container as="section" className="pt-24 sm:pt-32" aria-labelledby="selected-projects">
      <Reveal className="flex items-end justify-between gap-6">
        <h2 id="selected-projects" className="text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-none tracking-[-0.035em]">
          Selected projects
        </h2>
        <a href="#projects" className="link shrink-0 text-[0.9375rem] font-medium">
          All {projects.length} projects
        </a>
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <ProjectTile project={lead} large />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {rest.map((project, index) => (
            <Reveal key={project.id} delay={0.1 + index * 0.08}>
              <ProjectTile project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  )
}

function Impact() {
  return (
    <Container as="section" className="pt-24 sm:pt-36" aria-labelledby="impact">
      <Reveal>
        <p id="impact" className="max-w-[24ch] font-display text-[clamp(1.875rem,4.6vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.035em]">
          At Nouveau Elevator, I built an AI assistant that cut a form-entry workflow from ~5 minutes to{' '}
          <span className="mark whitespace-nowrap">~30 seconds.</span>
        </p>
        <a href="#experience" className="btn btn-ghost group mt-9">
          Work
          <ArrowRight
            size={16}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </a>
      </Reveal>
    </Container>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Now />
      <SelectedProjects />
      <Impact />
    </>
  )
}
