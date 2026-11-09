import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  x: XLogo,
} as const;

export function SocialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name as keyof typeof icons];
  if (!Icon) return null;
  return <Icon className={cn("size-4", className)} />;
}
