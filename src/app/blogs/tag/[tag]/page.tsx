import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import notes from "@/data/notes.json";
import PostList from "@/components/PostList";
import Reveal from "@/components/Reveal";
import { tagToSlug } from "@/lib/tags";

function tagNotes(tag: string) {
  return notes.notes.filter((note) =>
    note.tags.some((item) => tagToSlug(item) === tag)
  );
}

function tagLabel(tag: string) {
  return (
    notes.notes
      .flatMap((note) => note.tags)
      .find((item) => tagToSlug(item) === tag) ?? tag
  );
}

export function generateStaticParams() {
  const tags = new Set(notes.notes.flatMap((note) => note.tags));
  return Array.from(tags).map((tag) => ({ tag: tagToSlug(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const filtered = tagNotes(tag);

  if (filtered.length === 0) {
    return { title: "Tag not found" };
  }

  const label = tagLabel(tag);

  return {
    title: `Posts tagged “${label}”`,
    description: `Notes tagged “${label}” by Parmeshwar Yadav.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const filtered = tagNotes(tag);

  if (filtered.length === 0) notFound();

  const label = tagLabel(tag);

  return (
    <article className="pb-8 pt-4 sm:pt-6">
      <Reveal>
        <Link
          href="/blogs"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← all posts
        </Link>
        <h1 className="mt-4 font-mono text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
          {label}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"} tagged
          &ldquo;{label}&rdquo;.
        </p>
      </Reveal>

      <div className="mt-10">
        <PostList notes={filtered} />
      </div>
    </article>
  );
}
