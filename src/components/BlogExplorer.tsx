"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import notes from "@/data/notes.json";
import PostList from "./PostList";
import { cn } from "@/lib/utils";

const allTags = Array.from(
  new Set(notes.notes.flatMap((note) => note.tags))
).sort();

export default function BlogExplorer() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return notes.notes.filter((note) => {
      const matchesTag = !activeTag || note.tags.includes(activeTag);
      const matchesQuery =
        q.length === 0 ||
        `${note.title} ${note.excerpt} ${note.tags.join(" ")}`
          .toLowerCase()
          .includes(q);

      return matchesTag && matchesQuery;
    });
  }, [query, activeTag]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search posts…"
          aria-label="Search posts"
          className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-sm transition-colors outline-none placeholder:text-muted-foreground focus:border-foreground/40"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="press absolute top-1/2 right-2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={cn(
            "press cursor-pointer rounded-full border px-3 py-1 text-xs",
            activeTag === null
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          )}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            aria-pressed={activeTag === tag}
            className={cn(
              "press cursor-pointer rounded-full border px-3 py-1 text-xs",
              activeTag === tag
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "post" : "posts"}
      </p>

      <div className="mt-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTag ?? "all"}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
          >
            <PostList notes={filtered} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
