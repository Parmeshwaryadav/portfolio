"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  Check,
  Copy,
  FolderKanban,
  Home,
  Mail,
  Moon,
  PenLine,
  Search,
  Sun,
} from "lucide-react";
import projects from "@/data/projects.json";
import notes from "@/data/notes.json";

const pages = [
  { label: "Home", href: "/", icon: Home },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Blog", href: "/blogs", icon: PenLine },
  { label: "Contact", href: "/contact", icon: Mail },
];

const EMAIL = "yadavparmeshwar342@gmail.com";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-muted-foreground";

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);

    document.addEventListener("keydown", onKey);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(id);
    };
  }, [open]);

  const run = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can be blocked; fail quietly.
    }
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]">
          <motion.button
            type="button"
            aria-label="Close command menu"
            className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
          />

          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.99 }}
            transition={{
              duration: reduce ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Command label="Command menu" loop>
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Command.Input
            ref={inputRef}
            placeholder="Search pages, projects, posts…"
            className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:block">
            esc
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          <Command.Group heading="Pages" className={groupClass}>
            {pages.map((page) => (
              <Command.Item
                key={page.href}
                value={`${page.label} page`}
                onSelect={() => run(() => router.push(page.href))}
                className={itemClass}
              >
                <page.icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{page.label}</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Projects" className={groupClass}>
            {projects.projects.map((project) => (
              <Command.Item
                key={project.name}
                value={`${project.name} project`}
                onSelect={() => run(() => router.push("/projects"))}
                className={itemClass}
              >
                <FolderKanban className="size-4 shrink-0" />
                <span className="flex-1 truncate">{project.name}</span>
                <span className="text-[11px] text-muted-foreground">project</span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Writing" className={groupClass}>
            {notes.notes.map((note) => (
              <Command.Item
                key={note.slug}
                value={`${note.title} ${note.tags.join(" ")}`}
                onSelect={() => run(() => router.push(`/blogs/${note.slug}`))}
                className={itemClass}
              >
                <PenLine className="size-4 shrink-0" />
                <span className="flex-1 truncate">{note.title}</span>
                <span className="text-[11px] text-muted-foreground">
                  {note.readTime}
                </span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className={groupClass}>
            <Command.Item
              value="toggle theme dark light"
              onSelect={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className={itemClass}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="size-4 shrink-0" />
              ) : (
                <Moon className="size-4 shrink-0" />
              )}
              <span className="flex-1 truncate">
                Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
              </span>
            </Command.Item>

            <Command.Item
              value="copy email address"
              onSelect={() => {
                void copyEmail();
              }}
              className={itemClass}
            >
              {copied ? (
                <Check className="size-4 shrink-0" />
              ) : (
                <Copy className="size-4 shrink-0" />
              )}
              <span className="flex-1 truncate">
                {copied ? "Email copied" : "Copy email address"}
              </span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
