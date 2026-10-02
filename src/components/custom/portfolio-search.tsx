'use client'

import { ArrowUpRight, FileText, Folder, LayoutGrid, LoaderCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { SearchIcon } from '@/components/ui/navigation-icons'
import { portfolioEntries, searchPortfolio, type SearchEntry } from '@/utilities/portfolioSearch'

export default function PortfolioSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState<SearchEntry[]>([])
  const [loadingArticles, setLoadingArticles] = useState(false)
  const articlesLoaded = useRef(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const previousOverflow = useRef<string | null>(null)
  const reduceMotion = useReducedMotion()
  const id = useId()
  const results = searchPortfolio(query, [...portfolioEntries, ...articles])
  const wantsArticles = isOpen && query.trim().length > 0

  const openSearch = () => {
    setQuery('')
    setIsOpen(true)
  }

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && dialog.current?.open) {
        event.preventDefault()
        setIsOpen(false)
        return
      }
      if (
        !event.defaultPrevented &&
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        setQuery('')
        setIsOpen((current) => !current)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (isOpen) {
      if (!element.open) {
        previousOverflow.current = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        element.showModal()
      }
      input.current?.focus({ preventScroll: true })
      return
    }
    if (element.open) {
      const timeout = window.setTimeout(() => element.close(), reduceMotion ? 0 : 140)
      return () => window.clearTimeout(timeout)
    }
  }, [isOpen, reduceMotion])

  useEffect(
    () => () => {
      if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current
    },
    [],
  )

  useEffect(() => {
    if (!wantsArticles || articlesLoaded.current) return
    const controller = new AbortController()
    setLoadingArticles(true)
    void fetch('/api/portfolio-search', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Article search unavailable')
        const entries: unknown = await response.json()
        if (!Array.isArray(entries)) return
        const valid = entries.filter(
          (entry): entry is SearchEntry =>
            entry !== null &&
            typeof entry === 'object' &&
            typeof entry.title === 'string' &&
            typeof entry.href === 'string' &&
            entry.href.startsWith('/blogs/') &&
            entry.kind === 'Article' &&
            typeof entry.keywords === 'string',
        )
        setArticles(valid)
        articlesLoaded.current = true
      })
      .catch(() => {
        // Project and page results stay available without the CMS.
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingArticles(false)
      })
    return () => controller.abort()
  }, [wantsArticles])

  const resultKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const links = list.current?.querySelectorAll<HTMLAnchorElement>('a')
    const next = event.key === 'ArrowDown' ? index + 1 : index - 1
    if (links?.[next]) links[next].focus()
    else input.current?.focus()
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={openSearch}
        aria-label="Search portfolio"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        title="Search (⌘K / Ctrl+K)"
        className="flex size-8 items-center justify-center rounded-md text-secondary transition-colors hover:bg-neutral-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-neutral-900"
      >
        <SearchIcon className="size-4" />
      </button>
      <motion.dialog
        ref={dialog}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        data-state={isOpen ? 'open' : 'closed'}
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -8, scale: isOpen ? 1 : 0.98 }}
        transition={{ duration: reduceMotion ? 0 : isOpen ? 0.18 : 0.14, ease: [0.25, 1, 0.5, 1] }}
        onCancel={(event) => {
          event.preventDefault()
          setIsOpen(false)
        }}
        onClose={() => {
          setIsOpen(false)
          if (previousOverflow.current !== null) {
            document.body.style.overflow = previousOverflow.current
            previousOverflow.current = null
          }
          trigger.current?.focus({ preventScroll: true })
        }}
        onPointerDown={(event) => {
          if (event.target !== event.currentTarget) return
          const bounds = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            setIsOpen(false)
        }}
        className="portfolio-search-dialog fixed inset-x-0 top-[18vh] bottom-auto mx-auto my-0 w-[calc(100%-2rem)] max-w-[480px] overflow-hidden rounded-xl border border-neutral-200 bg-white p-0 text-primary shadow-2xl outline-none dark:border-neutral-800 dark:bg-neutral-950"
      >
        <h2 id={`${id}-title`} className="sr-only">
          Search portfolio
        </h2>
        <p id={`${id}-description`} className="sr-only">
          Search projects, pages, and articles. Use arrow keys to browse results, Enter to open, or
          Escape to close.
        </p>
        <div className="flex h-14 items-center gap-3 px-4">
          <SearchIcon className="size-4 shrink-0 text-secondary" />
          <input
            ref={input}
            type="search"
            aria-label="Search projects, pages, and articles"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search projects, pages, articles…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
                const links = list.current?.querySelectorAll<HTMLAnchorElement>('a')
                links?.[event.key === 'ArrowDown' ? 0 : links.length - 1]?.focus()
              } else if (event.key === 'Enter' && !event.nativeEvent.isComposing && results[0]) {
                event.preventDefault()
                list.current?.querySelector<HTMLAnchorElement>('a')?.click()
              }
            }}
            className="min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 text-sm text-primary shadow-none outline-none placeholder:text-secondary focus:border-0 focus:shadow-none focus:outline-none focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <kbd
            aria-hidden
            className="rounded border border-neutral-200 px-1.5 py-0.5 text-[10px] text-secondary dark:border-neutral-800"
          >
            esc
          </kbd>
        </div>
        {query.trim() && (
          <div className="border-t border-neutral-200 dark:border-neutral-800">
            {results.length ? (
              <ul
                ref={list}
                aria-label="Search results"
                className="max-h-[min(320px,50dvh)] overflow-y-auto p-2"
              >
                {results.map((result, index) => {
                  const Icon =
                    result.kind === 'Project'
                      ? Folder
                      : result.kind === 'Article'
                        ? FileText
                        : LayoutGrid
                  return (
                    <li key={result.href}>
                      <a
                        href={result.href}
                        onClick={() => setIsOpen(false)}
                        onKeyDown={(event) => resultKeyDown(event, index)}
                        className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100 dark:hover:bg-neutral-900 dark:focus-visible:bg-neutral-900"
                      >
                        <Icon
                          className="size-4 shrink-0 text-secondary"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1 truncate">{result.title}</span>
                        <span className="text-xs text-secondary">{result.kind}</span>
                        <ArrowUpRight className="size-3.5 shrink-0 text-secondary" aria-hidden />
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="flex items-center gap-2 px-4 py-5 text-sm text-secondary">
                {loadingArticles ? (
                  <>
                    <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden />
                    Searching…
                  </>
                ) : (
                  'No matches found.'
                )}
              </p>
            )}
            <p role="status" className="sr-only">
              {results.length} results{loadingArticles ? ', loading articles' : ''}
            </p>
          </div>
        )}
      </motion.dialog>
    </>
  )
}
