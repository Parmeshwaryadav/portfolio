import skills from "@/data/skills.json";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Reveal>
      <section>
        <h2 className="mb-5 font-mono text-xl font-bold leading-[1.15] tracking-tight sm:text-2xl">
          skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {skills.skills.map((skill) => (
            <li
              key={skill}
              className="lift rounded-full border border-border bg-muted/40 px-3 py-1.5 text-[13px] text-muted-foreground hover:border-foreground/30 hover:bg-muted hover:text-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
