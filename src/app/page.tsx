import Socials from "@/components/Socials";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import HeroPhoto from "@/components/HeroPhoto";
import RecentNotes from "@/components/RecentNotes";
import Skills from "@/components/Skills";
import CurrentlyReading from "@/components/CurrentlyReading";
import WaveEmoji from "@/components/eggs/WaveEmoji";
import Reveal from "@/components/Reveal";
import { FileText } from "lucide-react";

export default function Home() {
  return (
    <article className="flex flex-col gap-16 pb-8 pt-4 sm:gap-[72px] sm:pt-6">
      <section className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-8">
        <Reveal className="max-w-[24rem]">
          <h1 className="font-mono text-[2rem] font-bold leading-[1.15] tracking-tight text-balance sm:text-[2.5rem]">
            hi parmeshwar
            <br />
            <span className="whitespace-nowrap">
              here. <WaveEmoji />
            </span>
          </h1>
          <p className="mt-4 text-[17px] font-medium">
            Mumbai 🇮🇳
          </p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
          Business Analyst by profession, tech enthusiast and tinkerer by obsession. Building web tools to automate my own life (and yours), while trying not to pull a muscle playing football.
          </p>
          <CurrentlyReading />
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <a
              href="https://linkedin.com/in/parmeshwaryadav"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-sm font-medium press hover:bg-muted"
            >
              Resume
              <FileText className="size-3.5" />
            </a>
            <Socials />
          </div>
        </Reveal>
        <HeroPhoto />
      </section>

      <WorkExperience />
      <Projects />
      <Skills />
      <RecentNotes />
    </article>
  );
}
