import data from "@/data/projects.json";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Projects({
  featured = true,
}: {
  featured?: boolean;
}) {
  const projects = featured ? data.projects.slice(0, 2) : data.projects;

  return (
    <section>
      <SectionHeading
        eyebrow="selected work"
        title="projects i loved building"
        href={featured ? "/projects" : undefined}
      />
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
        {projects.map((project, idx) => (
          <Reveal key={project.name} delay={idx * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
