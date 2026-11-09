import { ArrowUpRight } from "lucide-react";
import data from "@/data/life.json";

type Entry = {
  title: string;
  note: string;
  url: string;
  author?: string;
  source?: string;
};

function EntryRow({ entry, meta }: { entry: Entry; meta: string }) {
  return (
    <li className="border-b border-border/70 py-4 first:pt-0 last:border-0 last:pb-0">
      <a
        href={entry.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-baseline gap-1.5"
      >
        <span className="link-underline font-medium text-foreground">
          {entry.title}
        </span>
        <ArrowUpRight className="size-3.5 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-300 ease-soft group-hover:-translate-y-0 group-hover:translate-x-0.5" />
      </a>
      <p className="mt-0.5 text-xs text-muted-foreground">{meta}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {entry.note}
      </p>
    </li>
  );
}

export default function ReadingList() {
  const { books, articles } = data.reading;

  return (
    <div className="mt-10 space-y-12">
      <section>
        <h3 className="font-mono text-base font-semibold tracking-tight">
          on the shelf
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Books I keep coming back to.
        </p>
        <ul className="mt-5">
          {books.map((book) => (
            <EntryRow key={book.title} entry={book} meta={book.author} />
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-mono text-base font-semibold tracking-tight">
          worth your tabs
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Essays and posts I&apos;ve sent to at least three people.
        </p>
        <ul className="mt-5">
          {articles.map((article) => (
            <EntryRow
              key={article.title}
              entry={article}
              meta={article.source}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
