import Projects from '@/components/custom/projects';
import { generateMetadata } from './[slug]/page'

import { Container } from '@/components/custom/container'
import { Heading } from '@/components/custom/heading';
import { Subheading } from '@/components/custom/subheading';
import { projects } from '@/constants/project';
import SectionHeading from '@/components/custom/section-heading';

export default function Home() {
  return (
    <div className="min-h-screen flex items-start justify-start">
      <Container className="min-h-screen md:pt-2 md:pb-10">
        <Heading>
          Muhammad Hassan
        </Heading>
        <Subheading>
          I'm a software engineer with a passion for building scalable and efficient systems. I'm currently working as a software engineer at Google.
        </Subheading>

        <SectionHeading delay={0.2}>A lifetime in Projects</SectionHeading>
        <Projects projects={projects.slice(0, 3)} />
      </Container>
    </div>
  );
}


export { generateMetadata }
