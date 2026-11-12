import { useCallback, useEffect, useRef, useState } from 'react'

// Copies text and reports 'copied' or 'failed' for a short moment so a button can confirm it.
export function useCopy(resetMs = 1800) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        setStatus('copied')
      } catch {
        setStatus('failed')
      }
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus('idle'), resetMs)
    },
    [resetMs],
  )

  return [status, copy]
}
