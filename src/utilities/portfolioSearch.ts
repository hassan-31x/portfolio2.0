import { projects } from '@/constants/project'
import { projectAnchor } from './projectAnchor'

export type SearchEntry = {
  title: string
  href: string
  kind: 'Page' | 'Project' | 'Article'
  keywords: string
}

export const portfolioEntries: SearchEntry[] = [
  { title: 'Home', href: '/', kind: 'Page', keywords: 'portfolio introduction Muhammad Hassan AI Product Engineer agentic multimodal RAG' },
  {
    title: 'Work & About',
    href: '/about',
    kind: 'Page',
    keywords: 'experience career timeline skills Useryze LangChain LangGraph education Habib awards',
  },
  {
    title: 'Projects',
    href: '/projects',
    kind: 'Page',
    keywords: 'apps agents RAG multimodal voice AI software python research github',
  },
  { title: 'Blogs', href: '/blogs', kind: 'Page', keywords: 'articles writing posts' },
  { title: 'Contact', href: '/contact', kind: 'Page', keywords: 'email message hire AI Product Engineering collaboration freelance' },
  ...projects.map(
    (project): SearchEntry => ({
      title: project.title,
      href: `/projects#${projectAnchor(project.title)}`,
      kind: 'Project',
      keywords: [
        project.description,
        ...project.stack,
        ...(project.details || []),
        project.repository || '',
      ].join(' '),
    }),
  ),
]

const normalize = (value: string) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

export function searchPortfolio(query: string, entries: SearchEntry[]): SearchEntry[] {
  const normalized = normalize(query)
  if (!normalized) return []
  const words = normalized.split(/\s+/)
  return entries
    .map((entry) => {
      const title = normalize(entry.title)
      const haystack = `${title} ${normalize(entry.keywords)}`
      const matches = words.every((word) => haystack.includes(word))
      const score =
        title === normalized
          ? 3
          : title.startsWith(normalized)
            ? 2
            : title.includes(normalized)
              ? 1
              : 0
      return { entry, matches, score }
    })
    .filter((result) => result.matches)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((result) => result.entry)
}
