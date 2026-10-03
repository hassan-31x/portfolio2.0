import { pageMetadata } from '@/utilities/pageMetadata'
import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import Projects from '@/components/custom/projects'
import { Subheading } from '@/components/custom/subheading'
import { projects } from '@/constants/project'

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>Projects</Heading>
        <Subheading>
          AI agents, RAG systems, multimodal applications, and the engineering behind them.
          Explore the live demos, source code, and details behind each one.
        </Subheading>
        <Projects projects={projects} />
      </Container>
    </div>
  )
}

export const metadata = pageMetadata(
  'Projects | Muhammad Hassan',
  'Explore Muhammad Hassan’s voice agents, RAG systems, multimodal AI applications, and engineering projects, with demos and source code where available.',
  '/projects',
)
