import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'
const EVENT = 'themechange'

// index.html sets <html data-theme> from the saved or system preference before
// first paint. That attribute is the single source of truth; this module only
// reads it and changes it.
const getSnapshot = () => document.documentElement.dataset.theme || 'light'
const getServerSnapshot = () => 'light'

function hasSavedChoice() {
  try {
    return ['light', 'dark'].includes(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return false
  }
}

function apply(theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0b0b0d' : '#f6f6f7')
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(onChange) {
  const media = window.matchMedia('(prefers-color-scheme: dark)')
  // Follow the system until the visitor picks a side.
  const onSystemChange = (event) => {
    if (!hasSavedChoice()) apply(event.matches ? 'dark' : 'light')
  }
  window.addEventListener(EVENT, onChange)
  media.addEventListener('change', onSystemChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    media.removeEventListener('change', onSystemChange)
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark'
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage can be blocked (private mode). The toggle still works for this visit.
    }
    apply(next)
  }, [])

  return [theme, toggle]
}
