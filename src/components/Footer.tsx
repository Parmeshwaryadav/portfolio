import Link from "next/link";
import { ArrowUp } from "lucide-react";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="mt-24 w-full pb-14">
      <div className="flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[13px] font-semibold tracking-tight">
            parmeshwar
          </span>
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}
          </span>
        </div>
        <Socials className="-ml-2 sm:ml-0" />
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/life"
            className="link-underline transition-colors hover:text-foreground"
          >
            life
          </Link>
          <a
            href="#top"
            className="press inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:border-foreground/30 hover:bg-muted hover:text-foreground"
          >
            back to top
            <ArrowUp className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
