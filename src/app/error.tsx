"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <article className="flex min-h-[62vh] flex-col justify-center pb-12 pt-6">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
        error
      </p>
      <h1 className="mt-4 font-mono text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
        something broke.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        A page-level hiccup. Try again — if it keeps happening, the inbox is
        open.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={reset}
          className="press inline-flex cursor-pointer items-center rounded-lg border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90"
        >
          try again
        </button>
        <Link
          href="/"
          className="press inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          home
        </Link>
        <a
          href="mailto:yadavparmeshwar342@gmail.com"
          className="press inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          email me
        </a>
      </div>
    </article>
  );
}
