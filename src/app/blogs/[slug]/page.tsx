import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import notes from "@/data/notes.json";
import PostList from "@/components/PostList";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import { tagToSlug } from "@/lib/tags";

const bodies: Record<string, string[]> = {
  football: [
    "Most of my week lives in screens. Sunday does not.",
    "A proper game is still the cleanest reset I know: ninety minutes, one ball, no Slack. The legs complain on Monday. The head does not.",
    "I treat it the way I treat good engineering — show up, do the simple thing well, leave a little better than I arrived.",
  ],
  "quiet-tools": [
    "I used to collect apps. Now I collect fewer tabs.",
    "The stack that lasts is boring on purpose: a fast editor, a browser I trust, and notes that are plain enough to survive a new laptop.",
    "If a tool needs a marketing site to explain itself, I probably do not need it.",
  ],
};

export function generateStaticParams() {
  return notes.notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.notes.find((item) => item.slug === slug);

  if (!note) {
    return { title: "Post not found" };
  }

  return {
    title: note.title,
    description: note.excerpt,
    openGraph: {
      type: "article",
      title: note.title,
      description: note.excerpt,
      publishedTime: note.date,
      authors: ["Parmeshwar Yadav"],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.excerpt,
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.notes.find((item) => item.slug === slug);
  const paragraphs = bodies[slug];

  if (!note || !paragraphs) notFound();

  const related = notes.notes
    .filter(
      (item) =>
        item.slug !== slug && item.tags.some((tag) => note.tags.includes(tag))
    )
    .slice(0, 2);

  return (
    <article className="pb-8 pt-4 sm:pt-6">
      <ReadingProgress />

      <Link
        href="/blogs"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← blog
      </Link>

      <h1 className="mt-6 font-mono text-3xl font-bold leading-[1.2] tracking-tight sm:text-4xl">
        {note.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>
          {note.date} · {note.readTime} read
        </span>
        {note.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blogs/tag/${tagToSlug(tag)}`}
            className="rounded-full bg-muted px-2 py-0.5 text-xs transition-colors hover:text-foreground"
          >
            {tag}
          </Link>
        ))}
      </div>

      <ShareButtons title={note.title} />

      <div className="mt-10 max-w-xl space-y-5 text-[16px] leading-7">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-8">
          <h2 className="font-mono text-xl font-bold leading-[1.15] tracking-tight">related posts</h2>
          <div className="mt-4">
            <PostList notes={related} />
          </div>
        </section>
      )}
    </article>
  );
}
