import Projects from '@/components/custom/projects';
import { generateMetadata } from './[slug]/page'

import { Container } from '@/components/custom/container'

export default function Home() {
  return (
    <div className="min-h-screen flex items-start justify-start">
      <Container className="min-h-screen md:pt-2 md:pb-10">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
          Muhammad Hassan
        </h1>
        <p className='text-secondary max-w-lg mt-4 text-sm md:text-sm'>
          I'm a software engineer with a passion for building scalable and efficient systems. I'm currently working as a software engineer at Google.
        </p>

        <Projects />
      </Container>
    </div>
  );
}


export { generateMetadata }
