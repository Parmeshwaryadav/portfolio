import Link from "next/link";
import { ArrowRight } from "lucide-react";
import data from "@/data/projects.json";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects({
  featured = true,
}: {
  featured?: boolean;
}) {
  const projects = featured ? data.projects.slice(0, 2) : data.projects;

  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-mono text-xl font-bold leading-[1.25] tracking-tight sm:text-2xl">
          projects i loved building
        </h2>
        {featured && (
          <Link
            href="/projects"
            className="nudge inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            view more
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        {projects.map((project, idx) => (
          <Reveal key={project.name} delay={idx * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
