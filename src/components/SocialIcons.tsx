import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
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
