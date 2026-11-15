import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Globe } from "lucide-react";

export type Project = {
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  links?: { name: string; href: string; icon: string }[];
};

export default function ProjectCard({ project }: { project: Project }) {
  const href = project.links?.[0]?.href || "/projects";
  const external = href.startsWith("http");

  return (
    <article className="group flex h-full flex-col">
      {project.image && (
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="press relative mb-4 block overflow-hidden rounded-xl border border-border bg-muted transition-[border-color,box-shadow] duration-300 ease-soft group-hover:border-foreground/20 group-hover:shadow-[0_16px_36px_-22px_rgba(0,0,0,0.5)]"
        >
          <Image
            src={project.image}
            alt={project.name}
            width={640}
            height={400}
            unoptimized={project.image.endsWith(".svg")}
            className="aspect-[16/10] w-full object-cover transition duration-500 ease-soft group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 top-3 grid size-8 place-items-center rounded-full border border-border/70 bg-background/80 text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
          >
            <ArrowUpRight className="size-3.5" />
          </span>
        </Link>
      )}
      <h3 className="text-[17px] font-semibold tracking-tight">
        {project.name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      {project.tags && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 font-mono text-[10.5px] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      {project.links && project.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.links
            .filter((link) => link.href)
            .map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-foreground/30 hover:bg-muted"
              >
                {link.icon === "github" ? (
                  <Github className="size-3.5" />
                ) : (
                  <Globe className="size-3.5" />
                )}
                {link.name}
              </a>
            ))}
        </div>
      )}
    </article>
  );
}
