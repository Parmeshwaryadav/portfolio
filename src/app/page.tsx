import Socials from "@/components/Socials";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import HeroPhoto from "@/components/HeroPhoto";
import RecentNotes from "@/components/RecentNotes";
import Skills from "@/components/Skills";
import CurrentlyReading from "@/components/CurrentlyReading";
import WaveEmoji from "@/components/eggs/WaveEmoji";
import Reveal from "@/components/Reveal";
import { FileText, MapPin } from "lucide-react";

export default function Home() {
  return (
    <article className="flex flex-col gap-16 pb-8 pt-6 sm:gap-[76px] sm:pt-10">
      <section className="flex flex-col-reverse items-start gap-9 md:flex-row md:items-center md:justify-between md:gap-10">
        <Reveal className="max-w-[25rem] md:max-w-[24rem]">
          <p className="eyebrow">business analyst · builder</p>
          <h1 className="mt-3 font-mono text-[2rem] font-bold leading-[1.12] tracking-tight text-balance sm:text-[2.5rem]">
            hi, i&apos;m parmeshwar
            <span className="text-accent">.</span> <WaveEmoji />
          </h1>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90">
            <MapPin className="size-3.5 text-muted-foreground" aria-hidden />
            Mumbai, India
          </p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Business Analyst by profession, tech enthusiast and tinkerer by
            obsession. Building web tools to automate my own life (and yours),
            while trying not to pull a muscle playing football.
          </p>
          <CurrentlyReading />
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <a
              href="https://linkedin.com/in/parmeshwaryadav"
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3.5 py-2 text-sm font-medium hover:border-foreground/30 hover:bg-muted"
            >
              Resume
              <FileText className="size-3.5" />
            </a>
            <Socials className="-ml-1.5" />
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
