import skills from "@/data/skills.json";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <Reveal>
      <section>
        <SectionHeading eyebrow="toolbox" title="skills" />
        <ul className="flex flex-wrap gap-2">
          {skills.skills.map((skill) => (
            <li key={skill} className="chip lift">
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
