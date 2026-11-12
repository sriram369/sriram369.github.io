import { useCallback, useEffect, useRef, useState } from 'react'

// Copies text and reports 'copied' or 'failed' for a short moment so a button can confirm it in place.
export function useCopy(resetMs = 1800) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text) => {
      // Confirm on the click itself; the clipboard answers a moment later and
      // only gets a say if it refuses.
      setStatus('copied')
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setStatus('idle'), resetMs)
      try {
        await navigator.clipboard.writeText(text)
      } catch {
        setStatus('failed')
      }
    },
    [resetMs],
  )

  return [status, copy]
}
