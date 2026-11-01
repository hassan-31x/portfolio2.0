import { pageMetadata } from '@/utilities/pageMetadata'
import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading'
import Projects from '@/components/custom/projects'
import { Subheading } from '@/components/custom/subheading'
import { mainProjects } from '@/constants/project'
import { researchProjects } from '@/constants/research-projects'
import ResearchProjects from '@/components/custom/research-projects'
import ClientProjects from '@/components/custom/client-projects'

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen pt-6 pb-10 md:pt-6 md:pb-10">
        <Heading>Projects</Heading>
        <Subheading>
          From transformer internals and speech adaptation to multimodal evaluation and deployed AI
          products. Alongside the research, a selection of software and client work.
        </Subheading>
        <section id="personal-projects" className="scroll-mt-20" aria-label="Personal projects">
          <Projects projects={mainProjects} heading="Personal projects" detailed />
          <ResearchProjects projects={researchProjects} />
        </section>
        <ClientProjects />
      </Container>
    </div>
  )
}

export const metadata = pageMetadata(
  'Projects | Muhammad Hassan',
  'Explore Urdu speech adaptation, MMCultureQA research for SemEval 2027, GPT 2 and BPE implementations, applied AI systems, and client projects.',
  '/projects',
)
