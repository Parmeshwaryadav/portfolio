import type { Metadata } from "next";
import BlogExplorer from "@/components/BlogExplorer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Short notes on building, tools, and the rest of the week — by Parmeshwar Yadav.",
};

export default function BlogPage() {
  return (
    <article className="pb-8 pt-4 sm:pt-6">
      <Reveal>
        <h1 className="font-mono text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
          blog
        </h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          Short notes on building, tools, and the rest of the week.
        </p>
      </Reveal>
      <div className="mt-10">
        <BlogExplorer />
      </div>
    </article>
  );
}
