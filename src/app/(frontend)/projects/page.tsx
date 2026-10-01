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
          A selection of web products, Python tools, AI experiments, and engineering projects.
          Explore the live demos, source code, and details behind each one.
        </Subheading>
        <Projects projects={projects} />
      </Container>
    </div>
  )
}

export const metadata = pageMetadata(
  'Projects | Muhammad Hassan',
  'Explore Muhammad Hassan’s web products, Python tools, AI research, and hardware projects, with live demos, verified technology stacks, and GitHub source code.',
  '/projects',
)
