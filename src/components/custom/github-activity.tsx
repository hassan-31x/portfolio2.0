import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/constants/profile'
import { last365Days, parseContributions } from '@/utilities/github-contributions'
import SectionHeading from './section-heading'

export default async function GitHubActivity() {
  let days: ReturnType<typeof parseContributions> = []
  try {
    const response = await fetch(`https://github.com/users/${profile.github}/contributions`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
      headers: { Accept: 'text/html' },
    })
    if (response.ok) days = last365Days(parseContributions(await response.text()))
  } catch {
    // The profile link remains useful if GitHub is unavailable.
  }
  const total = days.reduce((sum, day) => sum + day.count, 0)
  const offset = days[0] ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0
  const columns = Math.ceil((days.length + offset) / 7)
  const width = columns * 12 + 28
  const months = days.flatMap((day, index) =>
    day.date.endsWith('-01')
      ? [
          {
            label: new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en', {
              month: 'short',
              timeZone: 'UTC',
            }),
            x: Math.floor((index + offset) / 7) * 12 + 28,
          },
        ]
      : [],
  )
  return (
    <section className="portfolio-section px-4 py-3" aria-label="GitHub activity">
      <div className="flex items-center justify-between gap-3">
        <SectionHeading>Activity</SectionHeading>
        <a
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-secondary hover:text-primary"
        >
          GitHub
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
      {days.length ? (
        <>
          <div
            className="overflow-x-auto py-3"
            tabIndex={0}
            aria-label="Scrollable GitHub contribution calendar"
          >
            <svg
              width={width}
              height={112}
              role="img"
              aria-label={`${total.toLocaleString('en-US')} GitHub contributions from ${days[0]?.date} to ${days.at(-1)?.date}`}
              className="mx-auto max-w-none text-secondary"
            >
              {months.map((month) => (
                <text key={month.x} x={month.x} y={12} fill="currentColor" fontSize={11}>
                  {month.label}
                </text>
              ))}
              {['Mon', 'Wed', 'Fri'].map((label, i) => (
                <text key={label} x={0} y={41 + i * 24} fill="currentColor" fontSize={10}>
                  {label}
                </text>
              ))}
              {days.map((day, index) => (
                <rect
                  key={day.date}
                  x={28 + Math.floor((index + offset) / 7) * 12}
                  y={24 + ((index + offset) % 7) * 12}
                  width={9}
                  height={9}
                  rx={2}
                  fill={`var(--contrib-${day.level})`}
                >
                  <title>{`${day.count} contributions on ${day.date}`}</title>
                </rect>
              ))}
            </svg>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-secondary">
            <p>{total.toLocaleString('en-US')} contributions in the last 365 days</p>
            <div
              className="flex items-center gap-1.5"
              aria-label="Contribution intensity from less to more"
            >
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <span
                  key={level}
                  className="size-2.5 rounded-sm"
                  style={{ background: `var(--contrib-${level})` }}
                  aria-hidden
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </>
      ) : (
        <p className="py-6 text-sm text-secondary">
          The calendar is temporarily unavailable.{' '}
          <a href={`https://github.com/${profile.github}`} className="underline underline-offset-4">
            View my activity on GitHub.
          </a>
        </p>
      )}
    </section>
  )
}
