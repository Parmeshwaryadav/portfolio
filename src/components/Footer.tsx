import Link from "next/link";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="mt-20 w-full pb-16">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
        <Socials />
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/life"
            className="link-underline transition-colors hover:text-foreground"
          >
            life
          </Link>
          <p>© {new Date().getFullYear()} parmeshwar</p>
        </div>
      </div>
    </footer>
  );
}
