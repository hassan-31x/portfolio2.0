export type WorkExperience = {
  company: string
  logoUrl: string
  href: string
  badges: string[]
  location: string
  title: string
  start: string
  end: string | null
  description: string
  skills: string[]
}

export const workExperience: WorkExperience[] = [
  {
    company: 'Useryze',
    href: 'https://useryze.com',
    badges: ['RAG', 'AI Content'],
    location: 'Remote',
    title: 'AI Engineer',
    logoUrl: '/images/useryze.jpeg',
    start: 'Dec 2024',
    end: null,
    description:
      'Built an end-to-end AI content system using OpenAI, LangChain, Pinecone, Next.js, and Prisma. Connected Python scraping jobs to an authenticated source-to-draft workflow covering ingestion, document splitting, embeddings, semantic retrieval, generation, editing, storage, and export. Also built a Payload CMS-powered landing page for conversion optimization and A/B testing, deployed on VPS and AWS Amplify.',
    skills: ['Python', 'OpenAI', 'LangChain', 'Pinecone', 'Next.js', 'Prisma', 'Payload CMS', 'AWS Amplify'],
  },
  {
    company: 'GT Solutions USA',
    href: 'https://gtsolutionsusa.com',
    badges: ['CRM', 'Mobile Apps'],
    location: 'Remote',
    title: 'Full-Stack Engineer',
    logoUrl: '/images/gtsolutions.webp',
    start: 'May 2024',
    end: 'Jun 2025',
    description:
      'Built full-stack and mobile systems for operational workflows, including role-based CRM products for US daycares serving 1,000+ staff. Created an admin panel for Aga Khan Hospital’s food survey research and added location access and offline data management to the mobile app.',
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'React Native'],
  },
  {
    company: 'Xeverse.io',
    href: 'https://xeverse.io',
    badges: ['AI Data', 'Frontend'],
    location: 'Remote',
    title: 'Junior Full-Stack Developer',
    logoUrl: '/images/xeverse.jpeg',
    start: 'Jun 2023',
    end: 'Nov 2023',
    description:
      'Delivered the responsive frontend for DataPlus, an AI-data platform offering human-verified, rights-secured, training-ready datasets. Built reusable content sections, interactive animations, and conversion flows to communicate data quality, compliance, and model readiness.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
]
