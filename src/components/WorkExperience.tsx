import data from "../data/workexperience.json";
import Link from "next/link";

export default function WorkExperience() {
  return (
    <section className="px-8 flex flex-col mb-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Work Experience</h1>
      <div className="flex flex-col">
        {data.experience.map((exp, idx) => (
          <div key={idx} className="flex items-center justify-between">
            {/* Logo */}
            <div className="mr-3">
              <img
                className="rounded-sm"
                src="/ms_logo.png"
                alt={exp.company + " logo"}
                width={55}
                height={55}
                loading="lazy"
              />
            </div>
            {/* Main Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-lg font-semibold text-white truncate">
                {exp.link ? (
                  <Link
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {exp.company}
                  </Link>
                ) : (
                  exp.company
                )}
              </span>
              <span className="text-sm text-neutral-300">{exp.title}</span>
            </div>
            {/* Location & Duration */}
            <div className="flex flex-col items-end min-w-[120px] ml-4">
              <span className="text-base font-medium text-white/90">
                {exp.location}
              </span>
              <span className="text-xs text-neutral-400 mt-1">
                {exp.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
