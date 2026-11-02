import Link from "next/link";
import { tagToSlug } from "@/lib/tags";

export type Note = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <p className="py-8 text-sm text-muted-foreground">
        Nothing here yet — check back soon.
      </p>
    );
  }

  return (
    <ul>
      {notes.map((note) => (
        <li
          key={note.slug}
          className="border-b border-border py-8 first:pt-0 last:border-none last:pb-0"
        >
          <time
            className="text-xs text-muted-foreground"
            dateTime={note.date}
          >
            {formatDate(note.date)}
          </time>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">
            <Link
              href={`/blogs/${note.slug}`}
              className="link-underline transition-colors hover:text-accent"
            >
              {note.title}
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {note.excerpt}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {note.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blogs/tag/${tagToSlug(tag)}`}
                className="rounded-full bg-muted px-2 py-0.5 press hover:text-foreground"
              >
                {tag}
              </Link>
            ))}
            <span>· {note.readTime} read</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
