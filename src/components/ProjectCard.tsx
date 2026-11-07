import Image from "next/image";
import Link from "next/link";
import { Github, Globe } from "lucide-react";

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
    <article className="group">
      {project.image && (
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="press mb-4 block overflow-hidden rounded-xl border border-border bg-muted transition-[border-color,box-shadow] duration-300 ease-soft group-hover:border-foreground/25 group-hover:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.45)]"
        >
          <Image
            src={project.image}
            alt={project.name}
            width={640}
            height={400}
            unoptimized={project.image.endsWith(".svg")}
            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </Link>
      )}
      <h3 className="text-[17px] font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      {project.tags && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.links
            .filter((link) => link.href)
            .map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted hover:border-foreground/30"
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
