import type { Metadata } from "next";
import Socials from "@/components/Socials";
import CopyEmail from "@/components/CopyEmail";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Work chats, side projects, or a weekend football game — the inbox is open.",
};

export default function ContactPage() {
  return (
    <article className="pb-8 pt-4 sm:pt-6">
      <Reveal>
        <h1 className="font-mono text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl">
          say hello.
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Work chats, side projects, or a weekend football game. The inbox is
          open.
        </p>
        <CopyEmail />
        <div className="mt-6">
          <Socials />
        </div>
      </Reveal>
    </article>
  );
}
