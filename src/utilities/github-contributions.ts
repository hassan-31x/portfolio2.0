export type ContributionDay = { date: string; count: number; level: number }

/** Include today and the preceding 364 UTC dates, never future calendar cells. */
export function last365Days(days: ContributionDay[], today = new Date()): ContributionDay[] {
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - 364)
  const first = start.toISOString().slice(0, 10)
  const last = end.toISOString().slice(0, 10)
  return days.filter((day) => day.date >= first && day.date <= last)
}

/** Read the public calendar rather than requiring a token or showing invented activity. */
export function parseContributions(html: string): ContributionDay[] {
  const counts = new Map<string, number>()
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = match[1]?.match(/\bfor="([^"]+)"/)?.[1]
    const text = match[2]?.replace(/<[^>]+>/g, '').trim() || ''
    if (id)
      counts.set(id, Number(text.match(/^([\d,]+) contribution/)?.[1]?.replace(/,/g, '') || 0))
  }
  const days: ContributionDay[] = []
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const attributes = match[1] || ''
    const date = attributes.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/)?.[1]
    const id = attributes.match(/\bid="([^"]+)"/)?.[1]
    const level = Number(attributes.match(/\bdata-level="([0-4])"/)?.[1])
    if (date && id && counts.has(id) && Number.isInteger(level))
      days.push({ date, count: counts.get(id)!, level })
  }
  return days.sort((a, b) => a.date.localeCompare(b.date))
}
