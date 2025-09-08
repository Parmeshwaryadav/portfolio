import data from "../data/projects.json";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="px-4 md:px-8 flex flex-col items-center mb-10 max-w-6xl mx-auto w-full">
      <div className="flex w-full items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          featured projects
        </h1>
        <a
          href="/projects"
          className="text-base text-blue-300 hover:underline flex items-center gap-1 group"
        >
          view more{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {data.projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
}
