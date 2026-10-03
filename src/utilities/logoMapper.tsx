import Image from 'next/image'
import { technologyLogos, type Technology } from '@/constants/technology'

const monochromeLogos = new Set([
  'Next.js', 'OpenAI', 'OpenRouter', 'LangChain', 'Pinecone', 'PineconeDB',
  'Prisma', 'Shadcn', 'Socket.IO', 'WebRTC', 'GitHub', 'Framer Motion', 'Django',
])

export const getLogoForTechnology = (tech: string) => {
  const file = technologyLogos[tech as Technology]
  if (!file) {
    // Unknown labels remain readable rather than pretending to be a technology logo.
    return <span className="text-xs font-medium">{tech}</span>
  }

  return (
    <Image
      src={`/icons/technologies/${file}`}
      alt=""
      aria-hidden
      width={16}
      height={16}
      unoptimized
      className={`h-4 w-4 shrink-0 object-contain ${monochromeLogos.has(tech) ? 'dark:brightness-0 dark:invert' : ''}`}
    />
  )
}
