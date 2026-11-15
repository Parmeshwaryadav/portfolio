"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

function useIsMac() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
    const platform = nav.userAgentData?.platform ?? nav.platform ?? "";
    setIsMac(/mac|iphone|ipad|ipod/i.test(platform));
  }, []);

  return isMac;
}

const navLinks = [
  { name: "home", href: "/" },
  { name: "projects", href: "/projects" },
  { name: "blog", href: "/blogs" },
  { name: "contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isMac = useIsMac();

  return (
    <header className="sticky top-0 z-50 -mx-6 bg-background/80 px-6 backdrop-blur-md sm:-mx-8 sm:px-8">
      <nav className="flex items-center justify-between gap-2 py-7">
        <ul className="flex items-center gap-4 sm:gap-8">
          {navLinks.map((nav) => {
            const active =
              nav.href === "/"
                ? pathname === "/"
                : pathname.startsWith(nav.href);

            return (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  aria-current={active ? "page" : undefined}
                  data-active={active ? "true" : undefined}
                  className={cn(
                    "link-underline font-mono text-[13px] tracking-tight transition-colors sm:text-[15px]",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-menu"))}
            aria-label="Open command menu"
            className="press hidden cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <Search className="size-4" />
            <kbd className="hidden font-mono text-[10px] tracking-wide sm:inline">
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
