import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <article className="flex min-h-[62vh] flex-col justify-center pb-12 pt-6">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 font-mono text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
        nothing here.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        This page doesn&apos;t exist — or it packed up and moved. Let&apos;s get
        you back to something real.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/"
          className="press inline-flex items-center rounded-lg border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90"
        >
          home
        </Link>
        <Link
          href="/projects"
          className="press inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          projects
        </Link>
        <Link
          href="/blogs"
          className="press inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          blog
        </Link>
      </div>
    </article>
  );
}
