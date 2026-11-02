import Socials from "@/components/Socials";
import Reveal from "@/components/Reveal";

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
        <a
          href="mailto:yadavparmeshwar342@gmail.com"
          className="mt-8 inline-block text-lg hairline"
        >
          yadavparmeshwar342@gmail.com
        </a>
        <div className="mt-6">
          <Socials />
        </div>
      </Reveal>
    </article>
  );
}
