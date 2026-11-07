"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import data from "@/data/workExperience.json";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function WorkExperience() {
  const [tab, setTab] = useState<"work" | "education">("work");
  const reduce = useReducedMotion();

  const transition = { duration: reduce ? 0 : 0.22 };
  const initial = reduce ? false : { opacity: 0, y: 8 };
  const exit = reduce ? undefined : { opacity: 0, y: -8 };

  return (
    <Reveal>
      <section>
        <div className="relative mb-6 grid grid-cols-2 rounded-full bg-muted p-1 text-sm">
          {(["work", "education"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={cn(
                "press relative z-10 cursor-pointer rounded-full py-2 capitalize",
                tab === item
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === item &&
                (reduce ? (
                  <span className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm" />
                ) : (
                  <motion.span
                    layoutId="work-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ))}
              {item}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-border px-4 py-5 sm:px-5">
          <AnimatePresence mode="wait">
            {tab === "work" ? (
              <motion.ol
                key="work"
                initial={initial}
                animate={{ opacity: 1, y: 0 }}
                exit={exit}
                transition={transition}
              >
                {data.experience.map((exp, idx) => (
                  <li
                    key={exp.company}
                    className="relative flex gap-4 pb-8 last:pb-0"
                  >
                    {idx !== data.experience.length - 1 && (
                      <span className="absolute top-12 bottom-0 left-5 w-px bg-border" />
                    )}
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 mt-0.5 grid size-10 shrink-0 place-items-center rounded-full text-[11px] font-semibold tracking-wide text-white shadow-sm transition-transform duration-300 ease-soft hover:scale-105 motion-reduce:transition-none"
                      style={{ background: exp.logoBg }}
                      aria-label={exp.company}
                    >
                      {exp.initial}
                    </Link>
                    <div className="min-w-0 flex-1 pt-1">
                      <h2 className="text-[15px] font-semibold">
                        <Link
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline"
                        >
                          {exp.company}
                        </Link>
                      </h2>
                      {exp.roles.map((role) => (
                        <div key={role.title} className="mt-2 first:mt-0.5">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <p className="text-sm text-muted-foreground">
                              {role.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {role.duration}
                            </p>
                          </div>
                          {role.highlights.length > 0 && (
                            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                              {role.highlights.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="mt-[9px] size-1 shrink-0 rounded-full bg-muted-foreground/70" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </motion.ol>
            ) : (
              <motion.div
                key="education"
                initial={initial}
                animate={{ opacity: 1, y: 0 }}
                exit={exit}
                transition={transition}
                className="flex gap-4"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-muted text-sm font-semibold">
                  ∞
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  {data.education.map((item) => (
                    <div key={item.school}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h2 className="text-[15px] font-semibold">
                          {item.school}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {item.duration}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.detail}
                      </p>
                      {item.note && (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Reveal>
  );
}
