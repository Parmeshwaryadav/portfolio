import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="mt-20 w-full pb-16">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
        <Socials />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} parmeshwar.dev
        </p>
      </div>
    </footer>
  );
}
