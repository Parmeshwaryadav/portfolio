"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import projects from "@/data/projects.json";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

const categories = Array.from(
  new Set(projects.projects.map((project) => project.category))
);
const filters = ["all", ...categories];

export default function ProjectExplorer() {
  const [active, setActive] = useState("all");
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      active === "all"
        ? projects.projects
        : projects.projects.filter((project) => project.category === active),
    [active]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              "press cursor-pointer rounded-full border px-3.5 py-1.5 text-sm capitalize",
              active === filter
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout={!reduce} className="grid gap-10 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.div
              key={project.name}
              layout={!reduce}
              className="h-full"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : index * 0.03 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="py-10 text-sm text-muted-foreground">
          Nothing in this category yet.
        </p>
      )}
    </div>
  );
}
