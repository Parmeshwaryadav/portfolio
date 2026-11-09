import Link from "next/link";
import { ArrowRight } from "lucide-react";
import notes from "@/data/notes.json";
import Reveal from "./Reveal";

export default function RecentNotes() {
  return (
    <section>
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="font-mono text-xl font-bold leading-[1.15] tracking-tight sm:text-2xl">
          recent posts
        </h2>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground nudge hover:text-foreground"
        >
          view more
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <ul>
        {notes.notes.map((note, idx) => (
          <li key={note.slug} className="py-6 first:pt-0 last:pb-0">
            <Reveal delay={idx * 0.06}>
              <Link href={`/blogs/${note.slug}`} className="group block transition-transform duration-300 ease-soft hover:translate-x-0.5">
                <h3 className="text-[17px] font-semibold tracking-tight group-hover:underline">
                  {note.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {note.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                  <span>· {note.readTime} read</span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
