import { pageMetadata } from '@/utilities/pageMetadata'
import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import Projects from '@/components/custom/projects'
import { Subheading } from '@/components/custom/subheading'
import { projects } from '@/constants/project'
import ClientProjects from '@/components/custom/client-projects'

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>Projects</Heading>
        <Subheading>
          Personal experiments and real business work. Explore AI applications, dealership
          platforms, commerce, and the websites I’ve built for clients.
        </Subheading>
        <Projects projects={projects} heading="Personal projects" id="personal-projects" />
        <ClientProjects />
      </Container>
    </div>
  )
}

export const metadata = pageMetadata(
  'Projects | Muhammad Hassan',
  'Explore Muhammad Hassan’s personal AI projects and client work, including dealership platforms, business applications, jewelry storefronts, and freelance websites.',
  '/projects',
)
