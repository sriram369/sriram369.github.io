import { useEffect, useRef, useState } from 'react'
import { ArrowClockwise, ArrowUp, X } from '@phosphor-icons/react'
import { chat, profile } from '../data/site'

async function requestReply(messages, signal) {
  const response = await fetch(chat.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: messages.slice(-chat.maxMessages) }),
    signal,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok || !data.reply) throw new Error(data.error || 'No reply')
  return data.reply
}

// A side panel on wide screens and a bottom sheet on phones (see .ask-panel in
// index.css). Mounted only while open; `seed` is an optional first question.
export default function AskSri({ seed, onClose }) {
  const dialogRef = useRef(null)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const [messages, setMessages] = useState(() => (seed ? [{ role: 'user', content: seed }] : []))
  const [draft, setDraft] = useState('')
  const [failed, setFailed] = useState(false)

  // The conversation drives the network: whenever the newest message is the
  // visitor's, a reply is requested. Closing the panel or retrying cancels it.
  const waiting = messages.at(-1)?.role === 'user' && !failed
  useEffect(() => {
    if (!waiting) return
    const controller = new AbortController()
    requestReply(messages, controller.signal)
      .then((reply) => setMessages((current) => [...current, { role: 'assistant', content: reply }]))
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true)
      })
    return () => controller.abort()
  }, [messages, waiting])

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
    // showModal focuses the first control (the close button); the question field is the useful target.
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, waiting, failed])

  // Phone sheet: the grab handle closes on a tap, or when dragged down past a
  // short distance or flicked. Otherwise the sheet springs back.
  const drag = useRef(null)
  const onHandleDown = (event) => {
    drag.current = { startY: event.clientY, startTime: event.timeStamp, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onHandleMove = (event) => {
    const dialog = dialogRef.current
    if (!drag.current || !dialog) return
    const distance = Math.max(0, event.clientY - drag.current.startY)
    if (distance > 4) drag.current.moved = true
    dialog.dataset.dragging = ''
    dialog.style.transform = `translateY(${distance}px)`
  }
  const onHandleUp = (event) => {
    const dialog = dialogRef.current
    const gesture = drag.current
    drag.current = null
    if (!gesture || !dialog) return
    const distance = Math.max(0, event.clientY - gesture.startY)
    const speed = distance / Math.max(1, event.timeStamp - gesture.startTime)
    delete dialog.dataset.dragging
    dialog.style.transform = ''
    const pastThreshold = distance > Math.min(64, dialog.offsetHeight * 0.15)
    if (!gesture.moved || pastThreshold || speed > 0.11) onClose()
  }

  const full = messages.length >= chat.maxMessages
  const ask = (text) => {
    const question = text.trim().slice(0, chat.maxLength)
    if (!question || waiting || full) return
    setFailed(false)
    setMessages((current) => [...current, { role: 'user', content: question }])
    setDraft('')
    inputRef.current?.focus()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="ask-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      className="ask-panel overlay flex-col p-0"
    >
      <button
        type="button"
        aria-label="Close"
        className="sheet-handle"
        onPointerDown={onHandleDown}
        onPointerMove={onHandleMove}
        onPointerUp={onHandleUp}
        onPointerCancel={onHandleUp}
      />
      <header className="flex items-center justify-between gap-4 border-b border-line py-3 pr-3 pl-5 max-md:pt-0">
        <div>
          <h2 id="ask-title" className="font-display text-lg font-semibold tracking-[-0.02em]">
            Ask Sri
          </h2>
          <p className="text-sm text-muted">An AI assistant that knows Sriram's work</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="icon-btn sheet-close">
          <X size={18} aria-hidden="true" />
        </button>
      </header>

      <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain p-5" aria-live="polite">
        <p className="bubble bubble-them">Hi, I'm Sri. Ask me anything about Sriram: his work, projects, or background.</p>

        {messages.length === 0 && (
          <ul className="mt-1 flex flex-col items-start gap-2" aria-label="Suggested questions">
            {chat.suggestions.map((suggestion) => (
              <li key={suggestion}>
                <button type="button" onClick={() => ask(suggestion)} className="btn btn-ghost btn-sm h-auto min-h-9 py-2 text-left whitespace-normal">
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}

        {messages.map((message, index) => (
          <p key={index} className={`bubble ${message.role === 'user' ? 'bubble-me' : 'bubble-them'}`}>
            {message.content}
          </p>
        ))}

        {waiting && (
          <p className="bubble bubble-them" role="status">
            <span className="sr-only">Sri is thinking</span>
            <span aria-hidden="true" className="typing">
              <span />
              <span />
              <span />
            </span>
          </p>
        )}

        {failed && (
          <div role="alert" className="flex flex-col items-start gap-2 text-sm text-muted">
            <p>
              Sri could not answer just now. Try again, or email{' '}
              <a href={`mailto:${profile.email}`} className="link">
                {profile.email}
              </a>
              .
            </p>
            <button type="button" onClick={() => setFailed(false)} className="btn btn-ghost btn-sm">
              <ArrowClockwise size={15} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {full && !waiting && (
          <p className="text-sm text-muted">
            That is the limit for one conversation. For anything else, email{' '}
            <a href={`mailto:${profile.email}`} className="link">
              {profile.email}
            </a>
            .
          </p>
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          ask(draft)
        }}
        className="flex items-center gap-2 border-t border-line p-3"
      >
        <label htmlFor="ask-input" className="sr-only">
          Your question
        </label>
        <input
          id="ask-input"
          ref={inputRef}
          type="text"
          autoComplete="off"
          enterKeyHint="send"
          maxLength={chat.maxLength}
          placeholder="Ask about Sriram"
          value={draft}
          disabled={full}
          onChange={(event) => setDraft(event.target.value)}
          className="field min-w-0 flex-1"
        />
        <button type="submit" disabled={!draft.trim() || waiting || full} aria-label="Send" className="btn btn-primary btn-square">
          <ArrowUp size={17} weight="bold" aria-hidden="true" />
        </button>
      </form>
    </dialog>
  )
}
