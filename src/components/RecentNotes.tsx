import Link from "next/link";
import notes from "@/data/notes.json";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function RecentNotes() {
  return (
    <section>
      <SectionHeading eyebrow="writing" title="recent posts" href="/blogs" />
      <ul className="divide-y divide-border/60">
        {notes.notes.map((note, idx) => (
          <li key={note.slug} className="py-6 first:pt-0 last:pb-0">
            <Reveal delay={idx * 0.06}>
              <Link
                href={`/blogs/${note.slug}`}
                className="group block transition-transform duration-300 ease-soft hover:translate-x-0.5"
              >
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
                      className="rounded-full border border-border/70 bg-muted/40 px-2 py-0.5 font-mono text-[10.5px]"
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
