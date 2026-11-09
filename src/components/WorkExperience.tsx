"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
                    className="relative flex gap-5 pb-10 last:pb-0"
                  >
                    {idx !== data.experience.length - 1 && (
                      <span className="absolute top-14 bottom-0 left-6 w-px bg-border sm:top-16 sm:left-7" />
                    )}
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 mt-0.5 size-12 shrink-0 overflow-hidden rounded-md shadow-sm ring-1 ring-black/10 transition-transform duration-300 ease-soft hover:scale-105 motion-reduce:transition-none sm:size-14 dark:ring-white/10"
                      aria-label={exp.company}
                    >
                      <Image
                        src={exp.logo}
                        alt=""
                        width={160}
                        height={160}
                        className="size-full object-cover"
                      />
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
                className="flex gap-5"
              >
                <div className="size-12 shrink-0 overflow-hidden rounded-md shadow-sm ring-1 ring-black/10 sm:size-14 dark:ring-white/10">
                  <Image
                    src={data.education[0].logo}
                    alt=""
                    width={160}
                    height={160}
                    className="size-full object-cover"
                  />
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
