import type { Metadata } from "next";
import ProjectExplorer from "@/components/ProjectExplorer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects, tools, and experiments built by Parmeshwar Yadav.",
};

export default function ProjectPage() {
  return (
    <article className="pb-8 pt-4 sm:pt-6">
      <Reveal>
        <p className="mb-2 text-sm text-muted-foreground">selected work</p>
        <h1 className="font-mono text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
          projects
        </h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          Things I&apos;ve built — side projects, tools, and experiments.
        </p>
      </Reveal>
      <div className="mt-10">
        <ProjectExplorer />
      </div>
    </article>
  );
}
