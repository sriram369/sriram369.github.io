import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { EASE } from '../lib/motion'

export function Container({ as = 'div', className = '', ...props }) {
  const Tag = as
  return <Tag className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`} {...props} />
}

// Content fades up once as it enters the viewport, so a long page reads in sequence.
export function Reveal({ as = 'div', delay = 0, className, children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function PageHeader({ title, lead, eyebrow, children }) {
  return (
    <Container as="header" className="pt-[104px] pb-10 sm:pt-[136px] sm:pb-14">
      {eyebrow && <p className="meta mb-4">{eyebrow}</p>}
      <motion.h1
        id="page-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em] outline-none"
      >
        {title}
      </motion.h1>
      {lead && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted"
        >
          {lead}
        </motion.p>
      )}
      {children}
    </Container>
  )
}

const isExternal = (href) => /^https?:/.test(href)

// A link that announces where it goes: external links open a new tab and show an arrow.
export function TextLink({ href, download, children, className = '', arrow = true }) {
  const external = isExternal(href)
  return (
    <a
      href={href}
      download={download || undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`link inline-flex items-center gap-1 font-medium ${className}`}
    >
      {children}
      {external && arrow && <ArrowUpRight size={14} weight="bold" aria-hidden="true" className="shrink-0" />}
    </a>
  )
}

// crop: for wide wordmark files, show only the square mark at the left edge.
export function OrgLogo({ src, size = 28, crop = false, className = '' }) {
  if (!src) return null
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.style.visibility = 'hidden'
      }}
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-md border border-line bg-white ${crop ? 'object-cover object-left' : 'object-contain p-0.5'} ${className}`}
    />
  )
}
