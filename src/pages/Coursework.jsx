import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft } from '@phosphor-icons/react'
import { jhuSemesters, nusModules, vitYears } from '../data/coursework'
import { nusProgramme } from '../data/education'
import { Container, PageHeader } from '../components/ui'
import { EASE } from '../lib/motion'

const count = (groups) => groups.reduce((total, group) => total + group.courses.length, 0)

const tabs = [
  { key: 'jhu', label: 'Johns Hopkins', detail: `${count(jhuSemesters)} courses` },
  { key: 'vit', label: 'VIT Vellore', detail: `${count(vitYears)} courses` },
  { key: 'nus', label: 'NUS Singapore', detail: `${nusModules.length} modules` },
]

function GroupHeading({ children, total }) {
  return (
    <h2 className="flex items-baseline gap-3 border-b border-line pb-3 font-display text-xl font-semibold tracking-[-0.02em]">
      {children}
      <span className="meta font-normal">{total} courses</span>
    </h2>
  )
}

function JhuPanel() {
  return (
    <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
      {jhuSemesters.map((semester) => (
        <section key={semester.label}>
          <GroupHeading total={semester.courses.length}>{semester.label}</GroupHeading>
          <ul className="mt-4 space-y-3.5">
            {semester.courses.map((course) => (
              <li key={course.code} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3">
                <span className="meta">{course.code}</span>
                <span className="leading-snug">{course.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function VitPanel() {
  return (
    <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
      {vitYears.map((year) => (
        <section key={year.year}>
          <GroupHeading total={year.courses.length}>{year.year}</GroupHeading>
          <ul className="mt-4 space-y-3 text-[0.9375rem] leading-snug text-muted">
            {year.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function NusPanel() {
  return (
    <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
      <section className="lg:col-span-4">
        <span className="chip border-accent bg-accent text-on-accent">{nusProgramme.grade}</span>
        <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-[-0.025em]">{nusProgramme.title}</h2>
        <p className="mt-3 leading-relaxed text-muted">{nusProgramme.detail}</p>
        <h3 className="meta mt-8">Evaluated by</h3>
        <ul className="mt-3 space-y-4">
          {nusProgramme.evaluators.map((person) => (
            <li key={person.name}>
              <p className="font-medium">{person.name}</p>
              <p className="text-sm text-muted">{person.role}</p>
            </li>
          ))}
        </ul>
      </section>
      <ul className="grid content-start gap-x-10 gap-y-3.5 leading-snug sm:grid-cols-2 lg:col-span-8">
        {nusModules.map((module) => (
          <li key={module} className="relative pl-6">
            <span aria-hidden="true" className="absolute top-[0.65em] left-0 h-[2px] w-3 bg-accent" />
            {module}
          </li>
        ))}
      </ul>
    </div>
  )
}

const panels = { jhu: JhuPanel, vit: VitPanel, nus: NusPanel }

export default function Coursework() {
  const [active, setActive] = useState('jhu')
  const tabRefs = useRef({})
  const Panel = panels[active]

  // Standard tablist keyboard model: arrows move between tabs, Home/End jump.
  const onKeyDown = (event) => {
    const index = tabs.findIndex((tab) => tab.key === active)
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActive(tabs[next].key)
    tabRefs.current[tabs[next].key]?.focus()
  }

  return (
    <>
      <PageHeader title="Coursework" lead="Academic coursework across Johns Hopkins University, VIT Vellore, and NUS Singapore.">
        <a href="/education/" className="link mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
          <ArrowLeft size={15} weight="bold" aria-hidden="true" />
          Education
        </a>
      </PageHeader>

      <Container>
        <div role="tablist" aria-label="School" onKeyDown={onKeyDown} className="flex gap-1 overflow-x-auto border-b border-line">
          {tabs.map((tab) => {
            const selected = tab.key === active
            return (
              <button
                key={tab.key}
                ref={(node) => {
                  tabRefs.current[tab.key] = node
                }}
                type="button"
                role="tab"
                id={`tab-${tab.key}`}
                aria-selected={selected}
                aria-controls="coursework-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.key)}
                className={`relative shrink-0 px-4 pt-2 pb-4 text-left transition-colors first:pl-0 ${
                  selected ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                <span className="block font-display text-lg font-semibold tracking-[-0.02em] sm:text-xl">{tab.label}</span>
                <span className="meta mt-0.5 block">{tab.detail}</span>
                {selected && (
                  <motion.span
                    layoutId="coursework-tab"
                    className="absolute inset-x-4 -bottom-px h-[3px] bg-accent first:left-0"
                    style={tab.key === tabs[0].key ? { left: 0 } : undefined}
                    transition={{ type: 'spring', bounce: 0.12, duration: 0.4 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id="coursework-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="rounded-lg pt-10"
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </Container>
    </>
  )
}
