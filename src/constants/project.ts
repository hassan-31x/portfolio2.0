export type ProjectTypes = {
  title: string;
  src: string;
  href: string;
  description: string;
  stack: string[];
}[]

export const projects: ProjectTypes = [
  {
    title: 'Snap AI',
    src: '/images/snapai.png',
    href: 'https://snapai.studio',
    description: 'A platform for creating AI-powered images & video Ad Creatives.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'MongoDB', 'OpenAI'],
  },
  {
    title: 'AI-Powered Restaurant Agent',
    src: '/images/restaurant.png',
    href: '#',
    description: 'An AI Assistant to manage inbound calls for a restaurant.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'OpenAI', 'Vapi'],
  },
  {
    title: 'Conduit',
    src: '/images/conduit.png',
    href: 'https://main.dgn90on8wqij9.amplifyapp.com',
    description: 'A GPT-powered tool that scrapes viral LinkedIn posts & help users generate high-performance content.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'OpenAI', 'PineconeDB'],
  },
  {
    title: 'Website Builder',
    src: '/images/builder.png',
    href: 'https://website-builder-tawny-nine.vercel.app/editor',
    description: 'A website builder having drag & drop functionality for creating websites.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Shadcn', 'Firebase'],
  },
]