import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'
const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function apply(theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0b0b0d' : '#fafafa')
}

// Follows the system until the visitor picks a side, then remembers the choice.
// index.html applies the same rule before first paint to avoid a flash.
export function useTheme() {
  const [theme, setTheme] = useState(() => readStored() ?? (media().matches ? 'dark' : 'light'))

  useEffect(() => {
    apply(theme)
  }, [theme])

  useEffect(() => {
    const mq = media()
    const onChange = (event) => {
      if (!readStored()) setTheme(event.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Storage can be blocked (private mode). The toggle still works for this visit.
      }
      return next
    })
  }, [])

  return [theme, toggle]
}
