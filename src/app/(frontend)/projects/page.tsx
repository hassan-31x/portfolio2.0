import { Container } from "@/components/custom/container";
import { Heading } from "@/components/custom/heading";
import Projects from "@/components/custom/projects";
import { Subheading } from "@/components/custom/subheading";
import { projects } from "@/constants/project";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen items-start justify-start">
      <Container className="min-h-screen px-10 md:pt-2 md:pb-10">
        <Heading>Projects</Heading>
        <Subheading>
          I&apos;m a passionate software engineer dedicated to crafting elegant
          solutions for complex problems. With expertise in full-stack
          development, I enjoy building user-centric applications that make a
          difference.
        </Subheading>
        <Projects projects={projects} />
      </Container>
    </div>
  );
}
